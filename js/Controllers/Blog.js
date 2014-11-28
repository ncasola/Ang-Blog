/**
 * Created by Maikel Rivero Dorta mriverodorta@gmail.com on 7/08/14.
 */
"use strict";
var Blogapp = angular.module('AngBlog');

Blogapp.controller('BlogCtrl', ['$scope', 'openmodal', 'database', function($scope, openmodal, $database) {
    $scope.currentPage = 1;
    $scope.maxSize = 1;
    $scope.pageChange = function () {
      $database.get("posts", { limit: $scope.maxSize, offset: $scope.currentPage-1, count: true, order: "fecha" }).success(function(data) {
        $scope.items = data.items;
        $scope.totalItems = data.count;
      });
    };
    $scope.open = function (item) {
      openmodal(item);
    };
    $scope.pageChange();
  }]);


  Blogapp.controller('ArchivoCtrl', ['$scope', 'openmodal', 'database', '$routeParams', function($scope, openmodal, $database, $routeParams) {
    $scope.currentPage = 1;
    $scope.maxSize = 1;
    $scope.field = $routeParams.field;
    $scope.ID = $routeParams.id;
    $scope.categoria_nombre = $routeParams.name;
    $scope.pageChange = function () {
      $database.getArchive($scope.field,$scope.ID, { limit: $scope.maxSize, offset: $scope.currentPage-1, count: true, order: "fecha" }).success(function(data) {
        $scope.items = data.items;
        $scope.totalItems = data.count;
      });
    };
    $scope.open = function (item) {
      openmodal(item);
    };
    $scope.pageChange();
  }]);

  Blogapp.controller('ModalInstanceCtrl', ['$scope', 'item', '$modalInstance', function($scope, item, $modalInstance) {
    $scope.item = item;
    $scope.ok = function () {
      $modalInstance.close();
    };
  }]);
