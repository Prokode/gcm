var cron = require('node-cron');
const axios = require('axios');
const jwt = require('jsonwebtoken');
//Models
const Vente = require('./shared/db/models/Vente');
const User = require('./shared/db/models/User');
const Activation = require('./shared/db/models/Activation');

const globals = require('./shared/globals');


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

cron.schedule('* * * * *', () => {

    var error = new Error();
    Activation.find({}, function (err, activations) {
      if(err) {
        // error.status = 500;
        // next(error);
        console.log("Error");
        console.log(activations);
      }
      if (activations.length) {
        const activation = (activations.reverse())[0];
        activation_decode = jwt.decode(activation.token, {json: true});

        // Make a request to online to get last sell 

        axios.get(globals.BASE_ONLINE_API_URL + '/getLastSell.php', { 
            params: {
                'code': activation_decode.activation.code
            },
            headers: {
                'X-App-Id': globals.APP_ID
            }
        })
        .then(function (response) {
            // handle success
            // console.log("success");
            // console.log(response.data.sell.sell);
            const data = response.data;
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


                  axios.post(globals.BASE_ONLINE_API_URL + '/postSells.php', {
                    'sells': venteFormated,
                    'code': activation_decode.activation.code
                  }, {
                    headers: {
                        'X-App-Id': globals.APP_ID
                    }
                  })
                  .then(function (response) {
                    console.log(response.data);
                  })
                  .catch(function (error) {
                      // handle error
                      console.log("error");
                      console.log(error.response);
          
                  });

                }
            });  
        })
        .catch(function (error) {
            // handle error
            console.log("error");
            console.log(error.response);

        });
        
      } else {
          console.log(activations);
        // error.status = 500;
        // next(error);
      }
    });  
    
});