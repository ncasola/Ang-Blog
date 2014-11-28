/**
 * Created by Maikel Rivero Dorta mriverodorta@gmail.com on 7/08/14.
 */
'use strict';
angular.module('AngBlog')
    .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'partials/blog.html',
      controller: 'BlogCtrl'
    });
    $routeProvider.when('/admin', {
      templateUrl: 'partials/admin.html',
      controller: 'AdminCtrl'
    });
    $routeProvider.when('/admin/posts', {
      templateUrl: 'partials/admin_posts.html',
      controller: 'Admin_posts'
    });
    $routeProvider.when('/admin/meta/:table', {
      templateUrl: 'partials/admin_meta.html',
      controller: 'Admin_meta'
    });
    $routeProvider.when('/archivo/:field/:id/:name', {
      templateUrl: 'partials/archivo.html',
      controller: 'ArchivoCtrl'
    });
    $routeProvider.when('/login', {
      templateUrl: 'partials/auth.html',
      controller: 'AuthCtrl'
    });
    $routeProvider.otherwise({redirectTo: '/'})
    }]);
