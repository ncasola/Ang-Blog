/**
 * Created by Maikel Rivero Dorta mriverodorta@gmail.com on 7/08/14.
 */
'use strict';
angular.module('AngBlog')
.directive('showmeta', ['database', function($database) {
    return {
      restrict: 'E',
      template: '<a ng-href="#/archivo/{{field}}/{{meta.id}}/{{meta.nombre}}">{{meta.nombre}}</a>',
      scope:{
        ide:"=",
        field:"@",
        end:"@",
      },
      controller:function($scope){
        $database.getMeta($scope.end, $scope.ide).success(function(data){
         $scope.meta = data.items[0];
       });
      }
    };
 }])
.directive('htmlRender', function($compile) {
  return {
    restrict: 'E',
    scope: { html: '@' },
    link: function(scope, element) {
      scope.$watch('html', function(value) {
        if (!value) return;

        var markup = $compile(value)(scope);
        element.append(markup);
      });
    }
  };
})
.directive('fallbackSrc', function() {
        var missingDefault = "img/placeholder.gif";
         return {
            restrict: 'A',
            link: function(scope, element, attr) {
                element.on('error', function() {
                    element[0].src = attr.fallbackSrc ? attr.fallbackSrc : missingDefault;
                });
            }
        };
    })
.directive('loadingSrc', function() {
        var loadingDefault ="css/placeholder.gif";
         return {
            restrict: 'A',
            link: function(scope, element, attr) {
                element[0].src = attr.loadingSrc ? attr.loadingSrc : loadingDefault;
                var img = angular.element('<img />');
                img.src = scope.ngSrc;
                img.on('load', function() {
                    element[0].src = img.src;
                });
            }
        };
    })
.directive('integer', function(){
    return {
        require: 'ngModel',
        link: function(scope, ele, attr, ctrl){
            ctrl.$parsers.unshift(function(viewValue){
                return parseInt(viewValue, 10);
            });
        }
    };
})
.directive('detectActiveTab', function ($location) {
    return {
      link: function postLink(scope, element, attrs) {
        scope.$on("$routeChangeSuccess", function (event, current, previous) {
            var pathToCheck = "#" + $location.path();
            var href = $(element).find("a").attr("href");
            var tabLink = href;
            if (pathToCheck === tabLink) {
              element.addClass("active");
            }
            else {
              element.removeClass("active");
            }
        });
      }
    };
  });