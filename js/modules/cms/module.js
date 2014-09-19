angular.module('CMS', ['ui.bootstrap', 'ui.router', 'ngCookies','lbServices'])
.config(['$locationProvider', '$httpProvider', function ($locationProvider, $httpProvider) {
    $httpProvider.interceptors.push(['$q', '$location', 'Auth', function($q, $location, Auth) {
         return {
			'responseError': function(response) {
                if (response.status === 401){
                    Auth.currentUser = null;
					//$location.url('/login');
                }
				return $q.reject(response);
			}
		};
    }]);
    
    
}])
.run(['$rootScope', '$http', 'Auth', '$state', 'User', function($rootScope, $http, Auth, $state, User){
    
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
        if(!!toState.requireLogin && !Auth.currentUser){
            event.preventDefault();
            $state.go('login');
        }

    });
    
    // Logout function is available in any pages
    $rootScope.logout = function(){
      User.logout(function() {
        $rootScope.currentUser = null;
        Auth.currentUser = null;
        $state.go('login');
      });
    };
  }]);