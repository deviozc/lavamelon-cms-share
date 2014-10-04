/**
 * Auth Service
 */
angular.module('CMS').factory('Auth', [ AuthFactory]);

function AuthFactory() {
  var currentUser = null,
    _setCurrentUser = function(user) {
      currentUser = user;
    },
    _getCurrentUser = function() {
      return currentUser;
    },
    _ensureHasCurrentUser = function(User){
       if (currentUser) {
          console.log('Using cached current user.');
        } else {
          console.log('Fetching current user from the server.');
          currentUser = User.me(function(data) {
            // success
          }, function(response) {
            console.log('User.getCurrent() err', arguments);
            
          });
        }
    };

  return {
    setCurrentUser: _setCurrentUser,
    getCurrentUser: _getCurrentUser,
    ensureHasCurrentUser: _ensureHasCurrentUser
  };
}