/**
 * Auth Service
 */
angular.module('CMS').factory('Auth', ['$q', '$timeout', '$http', '$state', '$rootScope', 'sharedConstants', AuthFactory]);

function AuthFactory($q, $timeout, $http, $state, $rootScope, sharedConstants) {
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
			$state.go('login');
        }
      })
      .error(function(data, status, headers, config){
          $timeout(function(){deferred.reject();}, 0);
          $rootScope.$broadcast(sharedConstants.LOGIN_FAIL);
         $state.go('login');
      });

      return deferred.promise;
    };
    
    var _logout = function(){
        var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.post(sharedConstants.LOG_OUT)
      .success(function(){
        $rootScope.$broadcast(sharedConstants.LOGOUT_SUCCESS);
        $timeout(deferred.resolve, 0);
        authenticated = false;
        userProfile = {};
        $state.go('login');
        
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
        isAuthenticated: _isAuthenticated,
        logout: _logout
    };
   
}