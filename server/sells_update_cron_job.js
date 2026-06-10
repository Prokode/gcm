var cron = require('node-cron');
const jwt = require('jsonwebtoken');
//Models
const Vente = require('./shared/db/models/Vente');
const User = require('./shared/db/models/User');
const Activation = require('./shared/db/models/Activation');

const globals = require('./shared/globals');
const http = require('http');
const https = require('https');
const { URL } = require('url');

function buildUrlWithParams(baseUrl, params) {
  const url = new URL(baseUrl);
  if (params) {
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value);
      }
    });
  }
  return url.toString();
}

function fetchUrl(url, options) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const lib = parsedUrl.protocol === 'https:' ? https : http;
    const requestOptions = {
      method: options && options.method ? options.method : 'GET',
      headers: options && options.headers ? options.headers : {}
    };

    const req = lib.request(parsedUrl, requestOptions, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const body = Buffer.concat(chunks).toString();
        resolve({
          ok: res.statusCode >= 200 && res.statusCode < 300,
          status: res.statusCode,
          statusText: res.statusMessage,
          headers: res.headers,
          text: async () => body,
          json: async () => JSON.parse(body)
        });
      });
    });

    req.on('error', reject);
    if (options && options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

function fetchJson(url, options) {
  return fetchUrl(url, options);
}

function fetchPostJson(url, body, headers) {
  return fetchUrl(url, {
    method: 'POST',
    headers: Object.assign({'Content-Type': 'application/json'}, headers || {}),
    body: JSON.stringify(body)
  });
}


var getSellUser = (vente) => {
  return new Promise(
    function(resolve, reject) {
      User.findOne({_id: vente.user_id}, function(err, user) {
        if (err) {
          console.log(err);
          reject();
        }

        resolve(user);
        
      })
    }
  )
}

var getSociety = () => {
  return new Promise(
    function(resolve, reject) {

      User.findOne({role: 'ADMIN'}, function(err, user) {
        if (err) {
          console.log(err);
          reject();
        }

        resolve(user);

      });
    }
  )
}

cron.schedule('* * * * *', () => {
  try {

    var error = new Error();
    Activation.find({}, async function (err, activations) {
      if(err) {
        // error.status = 500;
        // next(error);
        console.log("Error");
        console.log(activations);
      }
      if (activations.length) {
        const activation = (activations.reverse())[0];
        activation_decode = jwt.decode(activation.token, {json: true});

        // Get society

        var society = null;

        await getSociety().then(
          (user) => {
            if (user !== null  && user !== undefined) {
              society = user.society;
            } 
          }
        );

        // Make a request to online to get last sell 

        console.log(activation_decode.activation.code);

        fetchJson(buildUrlWithParams(globals.BASE_ONLINE_API_URL + '/getLastSell.php', {
            'code': activation_decode.activation.code,
            'society': society
        }), {
            headers: {
                'X-App-Id': globals.APP_ID
            }
        })
        .then(async function (response) {
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }
            return response.json();
        })
        .then(function (data) {
            const last_sell_date = data.sell !== null && data.sell !== undefined ?
                new Date(data.sell.sell.created_at) : null;
            
            const params = data.sell !== null && data.sell !== undefined ?  {
              created_at: { $gt: last_sell_date }
            } : {};

            console.log(params);

            Vente.find(params).exec(async function (err, ventes) {
                if(err) {
                  // error.status = 500;
                  // next(error);
                  console.log("Error");
                  console.log(ventes);
                }
                if (ventes.length > 0) {

                  let agent = null;

                  var venteFormated = [];

                  await new Promise(
                    (resolve, reject) => {
                      ventes.forEach(async (vente, id) => {
                        await getSellUser(vente).then(
                          (agent) => {
                            agent = agent;
                            venteFormated.push({
                              ...vente,
                              agent: agent
                            });
                          }
                        );
                        if (id === (ventes.length - 1)) {
                          resolve();
                        }
                      });
                    }
                  );

                  console.log(venteFormated);

                  fetchPostJson(globals.BASE_ONLINE_API_URL + '/postSells.php', {
                    'sells': venteFormated,
                    'code': activation_decode.activation.code,
                    'society': society
                  }, {
                    'X-App-Id': globals.APP_ID
                  })
                  .then(async function (response) {
                    if (!response.ok) {
                      const errorText = await response.text();
                      throw new Error(`HTTP ${response.status}: ${errorText}`);
                    }
                    return response.json();
                  })
                  .then(function (responseData) {
                    console.log(responseData);
                  })
                  .catch(function (error) {
                      // handle error
                      console.log("error");
                      console.log(error);
                  });

                }
            });  
        })
        .catch(function (error) {
            // handle error
            console.log("error");
            console.log(error);

        });
        
      } else {
          console.log(activations);
        // error.status = 500;
        // next(error);
      }
    });  
  } catch(err) {
      console.log('Error when updating sells online.')
  }
    
});