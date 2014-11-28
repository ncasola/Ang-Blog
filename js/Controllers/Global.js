"use strict";
var Blogapp = angular.module('AngBlog');

  Blogapp.controller('GlobalCtrl', ['$scope', 'openmodal', 'database', 'AuthenticationService', '$location', function($scope, openmodal, $database, $auth, $location) {
    $database.get("config").success(function(data) {
      $scope.configBlog = _.groupBy(data.items, "name");;
    });
    $database.get("nav").success(function(data) {
      $scope.nav = _.sortBy(data.items, "order");
    });
    $database.get("widgets").success(function(data) {
      $scope.widgets = data.items;
    });
    $database.get("categorias").success(function(data) {
      $scope.categorias = data.items;
    });
    $database.get("autores").success(function(data) {
      $scope.autores = data.items;
    });
    $scope.path = $location;
    $scope.getposts = function(search) {

      return $database.search(search).then(function(response){
        return response.data.items;
    });

    };
    $scope.onSelect = function ($item, $model, $label) {
      openmodal($item);
    };
    $scope.logout = function () {
      $auth.ClearCredentials();
      $location.path('#/');
    };
  }]);

  Blogapp.controller('AuthCtrl', ['$scope', '$location', 'AuthenticationService', 'messageCenterService', function ($scope, $location, AuthenticationService, $alerts) {
        // reset login status
        AuthenticationService.ClearCredentials();

        $scope.login = function () {
          $scope.dataLoading = true;
          AuthenticationService.Login($scope.username, $scope.password, function(response) {
            if(response.success === true) {
              $alerts.add('success', 'Login! Bienvenido!', { timeout: 3000 });
              AuthenticationService.SetCredentials(response.id, $scope.username, $scope.password);
              $location.path('/admin');
            } else {
              $scope.error = response.message;
              $scope.dataLoading = false;
            }
          });
        };
  }]);