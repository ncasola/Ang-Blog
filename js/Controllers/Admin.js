"use strict";
var Blogapp = angular.module('AngBlog');

Blogapp.controller('AdminCtrl', ['$scope', function($scope) {
    var admin_path = [
    {name: "Posts", url: "#/admin/posts"}, 
    {name: "Configuraciones", url: "#/admin/meta/config"}, 
    {name: "Menu", url: "#/admin/meta/nav"}, 
    {name: "Widgets", url: "#/admin/meta/widgets"},
    {name: "Categorias", url: "#/admin/meta/categorias"},
    {name: "Autores", url: "#/admin/meta/autores"}
    ];
    $scope.items = admin_path;
}]);

Blogapp.controller('Admin_posts', 
    ['$scope', '$rootScope', 'database', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'messageCenterService', 
    function($scope, $rootScope, $database, DTOptionsBuilder, DTColumnDefBuilder, $alerts) {

    $scope.getFromSource = function() {
      $database.getAdmin("posts").success(function(data) {
      $scope.items = data.items;
      });
    };
    $database.get("categorias").success(function(data) {
      $scope.cats = data.items;
    });
    var _builditem2Add = function () {
        return {
            id: null,
            fecha: new Date().format("Y/m/d")
        }
    };
    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };
     $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
    $scope.format = 'yyyy/MM/dd';
    $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withBootstrap();
    $scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3),
        DTColumnDefBuilder.newColumnDef(4),
        DTColumnDefBuilder.newColumnDef(5),
        DTColumnDefBuilder.newColumnDef(6).notSortable()
    ];

    $scope.additem = function () {
        $scope.item2Add.fecha = new Date($scope.item2Add.fecha).format("Y/m/d");
        $database.postAdmin("posts", $scope.item2Add).success(function(data) {
          $alerts.add('success', 'Añadido ' + data.success, { timeout: 3000 });
          $scope.getFromSource();
          $scope.item2Add = _builditem2Add();
        });
    };

    $scope.modifyitem = function (item) {
        $scope.item2Add = item;
    };
    $scope.ClearItem = function () {
        $scope.item2Add = _builditem2Add();
    };
    $scope.removeitem = function (id) {
        $database.deleteAdmin("posts", id).success(function(data) {
           $alerts.add('success', 'Eliminada ' + data.success, { timeout: 3000 });
           $scope.getFromSource();
        });
    };
    $scope.getFromSource();
    $scope.ClearItem();
}]);


Blogapp.controller('Admin_meta', 
    ['$scope', '$routeParams', 'database', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'messageCenterService', 
    function($scope, $routeParams, $database, DTOptionsBuilder, DTColumnDefBuilder, $alerts) {
    var table = $routeParams.table;
    $scope.table = table;
    $scope.getFromSource = function() {
      $database.getAdminMeta(table).success(function(data) {
          $scope.items = data.items;
          $scope.keys = _.chain($scope.items).first().omit("id").keys().value();
          $scope.createDT();
      });
    };
    var _builditem2Add = function () {
        return {
            id: null
        }
    };
    $scope.additem = function () {
        $database.postAdminMeta(table, $scope.item2Add).success(function(data) {
          $alerts.add('success', 'Añadido ' + data.success, { timeout: 3000 });
          $scope.getFromSource();
          $scope.item2Add = _builditem2Add();
        });
    };

    $scope.modifyitem = function (item) {
        $scope.item2Add = item;
    };
    $scope.ClearItem = function () {
        $scope.item2Add = _builditem2Add();
    };
    $scope.createDT = function() {
        $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withBootstrap();
        $scope.dtColumnDefs = [];
        var lenk = $scope.keys.length +1;
        for (var i=0; i<lenk; i++) {
            $scope.dtColumnDefs.push(DTColumnDefBuilder.newColumnDef(i));
        };
    };
    $scope.removeitem = function (id) {
        $database.deleteAdminMeta(table, id).success(function(data) {
           $alerts.add('success', 'Eliminada ' + data.success, { timeout: 3000 });
           $scope.getFromSource();
        });
    };
    $scope.getFromSource();
    $scope.ClearItem();
}]);