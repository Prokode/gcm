const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const { app } = require('electron');
let userDataPath;
let dbPath;
try {
    userDataPath = app.getPath('userData');
    dbPath = userDataPath + '/db/data';
} catch(e) {
    console.log(e);
}
   

const globalData = {
    board: null,
    jwtSecret: 'GniQ2JathEh',
    APP_ID: 'GCM_IOT_APP',
    // BASE_ONLINE_API_URL: 'http://localhost/gcm',
    BASE_ONLINE_API_URL: 'http://api.dotcomteam.net',
    DB_PATH: dbPath,
    // path.join(__dirname, '/db/data'),
    ACTIVATION_KEY:'@&GCMANAGER*/!2019=@',
    randomNumber: function() {
        return Math.floor(100000 + Math.random() * 900000);
    },
    getJwtPayLoad: function(req) {
        const token = req.headers.authorization.slice(7);
        const jwtPayLoad = jwt.decode(token);
        return jwtPayLoad;
    },
    dbTableExist(table_name) {
        const table_path = dbPath + '/' + table_name + '.json';
        return fs.existsSync(table_path);
    },
    asyncForEach: async function(array, callback) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array);
        }
    },
    postes: [
        {
            "poste": "UE9TVEUgMQ==",
            "id": "MQ=="
        },
        {
            "poste": "UE9TVEUgMg==",
            "id": "Mg=="
        },
        {
            "poste": "UE9TVEUgMw==",
            "id": "Mw=="
        },
        {
            "poste": "UE9TVEUgNA==",
            "id": "NA=="
        }
    ]
};

module.exports = globalData;
