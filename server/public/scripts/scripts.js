"use strict";
var app = angular.module("app", ["ngRoute", "btford.socket-io"]);

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "asset/templates/ventes.html",
    controller  : "HomeCtrl"
  })
  .when("/login", {
    templateUrl : "asset/templates/login.html",
    controller  : "LoginCtrl",
    resolve : {
      //This function is injected with the AuthService where you'll put your authentication logic
      'auth' : function(AuthService){
          return AuthService.notAuthenticate();
      }
    }
  })
  .when("/admin", {
    templateUrl : "asset/templates/admin.html",
    controller  : "AdminCtrl",
    resolve : {
      //This function is injected with the AuthService where you'll put your authentication logic
      'auth' : function(AuthService){
          return AuthService.authenticate();
      },
      'postes' : function(AdminService){
        return AdminService.getPostesTarifs();
      },
      'boards' : function(AdminService){
        return AdminService.getBoards();
      }
    }
  })
  .otherwise({
    redirectTo: "/"
  });
});

app.run(function($rootScope, $location){

  //If the route change failed due to authentication error, redirect them out
  $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
      console.log(current);
      if(rejection === 'Not Authenticated'){
          $location.path('/login');
      }
      if(rejection === 'Authenticated'){
        $location.path('/admin');
      }
  });

});

app.factory('MySocket', function (socketFactory) { return socketFactory(); });