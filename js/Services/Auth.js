/**
* Created by Maikel Rivero Dorta mriverodorta@gmail.com on 7/08/14.
*/
'use strict';

angular.module('AngBlog')
.factory('AuthenticationService', ['Base64', 'database', '$cookieStore', '$rootScope', '$timeout', '$http', function (Base64, $database, $cookieStore, $rootScope, $timeout, $http) {
var service = {};

service.Login = function (username, password, callback) {

  $database.login(username, password)
  .success(function (response) {
   callback(response);
 });
};

service.SetCredentials = function (id, username, password) {
  var authdata = Base64.encode(username + ':' + password);

  $rootScope.globals = {
    currentUser: {
      id: id,
      username: username,
      authdata: authdata
    }
  };

  $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
  $cookieStore.put('globals', $rootScope.globals);

};

  service.ClearCredentials = function () {
    $rootScope.globals = {};
    $cookieStore.remove('globals');
    $http.defaults.headers.common.Authorization = 'Basic ';
  };

  return service;
}]);
