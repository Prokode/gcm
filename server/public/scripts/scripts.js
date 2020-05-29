"use strict";
var app = angular.module("app", ["btford.socket-io"]);

/***********************************HTTP INTERCEPTOR***************************************/
app.config(function ($httpProvider) {
  // Add the interceptor to the $httpProvider.
  $httpProvider.interceptors.push('HttpInterceptorFactory');
});

app.factory('MySocket', function (socketFactory) { return socketFactory(); });


