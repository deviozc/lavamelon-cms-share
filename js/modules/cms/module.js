angular.module('CMS', ['ui.bootstrap', 'ui.router', 'ngCookies'])
.config(function ($locationProvider, $httpProvider) {
    $httpProvider.interceptors.push(function($q, $location) {
         return {
			'response': function(response) {
                if (response.status === 401){
					$location.url('/login');
                    return $q.reject(response);
                }
                else{
                    return response;
                }
			}
		};
    });
    
    
})
.run(function($rootScope, $http, Auth, $location){
    
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
        if(!!toState.requireLogin && !Auth.isAuthenticated()){
            event.preventDefault();
            $location.url('/login');
        }

    });
    
    // Logout function is available in any pages
    $rootScope.logout = function(){
      
    };
  });