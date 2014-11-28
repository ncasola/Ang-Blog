/**
 * Created by Maikel Rivero Dorta mriverodorta@gmail.com on 7/08/14.
 */
'use strict';

angular.module('AngBlog')
.service('database', ['$http', function($http) {
    // BLOG
    this.get = function(table, params) {
      return $http.get('api/blog/' + table, {
        params: params
      });
    };
    this.getArchive = function(field, id, params) {
      return $http.get('api/blog/posts/' + field + '/' + id, {
        params: params
      });
    };
    this.getMeta = function(field, id) {
      return $http.get('api/blog/meta/'+ field + '/id/' + id);
    };
    this.login = function(username, password) {
      return $http.post('api/auth', {  username: username, password: password });
    };
    // Añadir busqueda por body usando un select para cambiar la variable field
    this.search = function(search) {
      return $http.get('api/blog/posts/titulo/' + search , {
        params: {
          like: true
        }
      });
    };
    // ADMIN
    this.getAdmin = function(table, params) {
      return $http.get('api/admin/datatable/' + table, {
        params: params
      });
    };
    this.postAdmin = function(table, data) {
      return $http.post('api/admin/datatable/' + table, data);
    };
    this.deleteAdmin = function(table, id) {
      return $http.delete('api/admin/datatable/' + table + '/' + id);
    };
    // ADMIN META
    this.getAdminMeta = function(table, params) {
      return $http.get('api/admin/datatable/meta/' + table, {
        params: params
      });
    };
    this.postAdminMeta = function(table, data) {
      return $http.post('api/admin/datatable/meta/' + table, data);
    };
    this.deleteAdminMeta = function(table, id) {
      return $http.delete('api/admin/datatable/meta/' + table + '/' + id);
    };
}])
.factory('openmodal', ['$modal', function($modal) {
   return function(item) {
    $modal.open({
      templateUrl: 'partials/modal_blog.html',
      controller: 'ModalInstanceCtrl',
      size: "lg",
      windowClass : 'modal_blog',
      resolve: {
        item: function () {
          return item;
        }
      }
    });
  };
}])
.factory('Base64', function () {
    /* jshint ignore:start */

    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    return {
      encode: function (input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        do {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);

          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;

          if (isNaN(chr2)) {
            enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
            enc4 = 64;
          }

          output = output +
          keyStr.charAt(enc1) +
          keyStr.charAt(enc2) +
          keyStr.charAt(enc3) +
          keyStr.charAt(enc4);
          chr1 = chr2 = chr3 = "";
          enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return output;
      },

      decode: function (input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
              window.alert("There were invalid base64 characters in the input text.\n" +
                "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
              enc1 = keyStr.indexOf(input.charAt(i++));
              enc2 = keyStr.indexOf(input.charAt(i++));
              enc3 = keyStr.indexOf(input.charAt(i++));
              enc4 = keyStr.indexOf(input.charAt(i++));

              chr1 = (enc1 << 2) | (enc2 >> 4);
              chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
              chr3 = ((enc3 & 3) << 6) | enc4;

              output = output + String.fromCharCode(chr1);

              if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
              }
              if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
              }

              chr1 = chr2 = chr3 = "";
              enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
          }
        };

        /* jshint ignore:end */
});
