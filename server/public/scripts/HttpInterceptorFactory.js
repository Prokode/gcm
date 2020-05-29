app.factory('HttpInterceptorFactory', function($q) {
    return {
      // On request success
      request: function (config) {
          // console.log(config); // Contains the data about the request before it is sent.
          // Return the config or wrap it in a promise if blank.
          config.headers['X-APP-ID'] = 'GCM_IOT_APP';

          return config || $q.when(config);
      },
  
      // On request failure
      requestError: function (rejection) {
          // console.log(rejection); // Contains the data about the error on the request.
          // Return the promise rejection.
          console.log('request failure');
          return $q.reject(rejection);
      },
  
      // On response success
      response: function (response) {
          // console.log(response); // Contains the data from the response.
          // var progressbar = $injector.get('ngProgressFactory').createInstance();
          // Return the response or promise.
          // progressbar.complete();
          console.log('response success');
          return response || $q.when(response);
  
      },
  
      // On response failture
      responseError: function (rejection) {
          // console.log(rejection); // Contains the data about the error.
          // Return the promise rejection.
          // progressbar.complete();
          console.log('response failure');
          return $q.reject(rejection);
  
      }
    };
  });