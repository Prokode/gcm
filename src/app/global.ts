export const GlobalVariable = Object.freeze({
    /******* local ***********/
    /*
    BASE_API_URL: 'http://localhost/emedicalrdv-api/ADMIN/',
    HOPITAL_MEDIA_URL: 'http://localhost/emedicalrdv-api/ADMIN/hospitals/',
    APP_ID: 'E_MEDICAL_RDV_APP_ID',
    */
    /******* dev ***********/
    BASE_API_URL: 'http://localhost:8080',
    BASE_ONLINE_API_URL: 'http://localhost:80/gcm',
    HOPITAL_MEDIA_URL: 'https://dev.api.emedicalrdv.com/ADMIN/hospitals/',
    APP_ID: 'GCM_IOT_APP',
    FormatMoney: function(money, n = 0, x = 3, s = ' ', c) {
      money = Number(money);
      var moneyInString = money.toString();
      if (moneyInString.length >= 3) {
          var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
          num = money.toFixed(Math.max(0, ~~n));
          return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
      }
      return money;
    },
    
    /******* prod ***********/
    /*
    BASE_API_URL: 'https://api.emedicalrdv.com/ADMIN/',
    HOPITAL_MEDIA_URL: 'https://api.emedicalrdv.com/ADMIN/hospitals/',
    APP_ID: 'E_MEDICAL_RDV_APP_ID'
    */
   
    CONSOLES: [
      {
        name: 'Playstation 2', img: 'ps2.jpg'
      },
      {
        name: 'Playstation 2', img: 'ps2.jpg'
      }
    ]
  });
