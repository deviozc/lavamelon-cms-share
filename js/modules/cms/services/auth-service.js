/**
 * Auth Service
 */
angular.module('CMS').factory('Auth', ['$q', AuthFactory]);

function AuthFactory($q) {
  var currentUser = null,
    _setCurrentUser = function(user) {
      currentUser = user;
    },
    _getCurrentUser = function() {
      return currentUser;
    },
    _ensureHasCurrentUser = function(User){
      var deferred = $q.defer();
       if (!!currentUser) {
          console.log('Using cached current user.');
          deferred.resolve();
        } else {
          console.log('Fetching current user from the server.');
          User.me(function(data) {
            currentUser = data;
            deferred.resolve();
          }, function(response) {
            console.log('User.getCurrent() err', arguments);
            deferred.reject();
          });
        }
        return deferred.promise;
    };

  return {
    setCurrentUser: _setCurrentUser,
    getCurrentUser: _getCurrentUser,
    ensureHasCurrentUser: _ensureHasCurrentUser
  };
}