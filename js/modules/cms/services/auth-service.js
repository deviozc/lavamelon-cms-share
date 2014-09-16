/**
 * Auth Service
 */
angular.module('CMS').factory('Auth', ['$q', '$timeout', '$http', '$location', '$rootScope', 'sharedConstants', AuthFactory]);

function AuthFactory($q, $timeout, $http, $location, $rootScope, sharedConstants) {
    var userProfile = {},
        authenticated = false;
    
    var _login = function(data){
        //       // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.post(sharedConstants.LOG_IN, data)
      .success(function(user){
        // Authenticated
        if (user !== '0'){
            _setUserProfile(user);
            $rootScope.$broadcast(sharedConstants.LOGIN_SUCCESS, _getUserProfile());
            $timeout(deferred.resolve, 0);
        }
          

        // Not Authenticated
        else {
			_setUserProfile({});
			$timeout(function(){deferred.reject();}, 0);
            $rootScope.$broadcast(sharedConstants.LOGIN_FAIL);
			$location.url('/login');
        }
      })
      .error(function(data, status, headers, config){
          $rootScope.$broadcast(sharedConstants.LOGIN_FAIL);
          $location.url('/login');
      });

      return deferred.promise;
    };
    
    var _setUserProfile = function(user){
        
    };
    
    var _getUserProfile = function(){
        return userProfile;
    };
    
    var _isAuthenticated = function(){
        return authenticated;
    };
    
    return{
        login : _login,
        getUserProfile: _getUserProfile,
        isAuthenticated: _isAuthenticated
    };
   
}