angular.module('CMS', ['ui.bootstrap', 'ui.router', 'ngCookies','ngAnimate','toaster','lbServices', 'textAngular','angular-loading-bar'])
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
.config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider) {

    // Application routes
    $stateProvider
		.state('login', {
			url: '/login',
            templateUrl: 'assets/shared/pages/login.html',
			controller: 'LoginCtrl',
            data: {
                title: 'Login'  
            },
			requireLogin: false
		})
		.state('main.newUser', {
			url: 'access/newuser',
            templateUrl: 'assets/shared/pages/access_control/add_user.html',
            controller: 'AccessCtrl',
			data: {
                title: 'Access Control'  
            },
            requireLogin: true,
			adminOnly:true
		})
		.state('main.newRole', {
			url: 'access/newrole',
            templateUrl: 'assets/shared/pages/access_control/add_role.html',
            controller: 'AccessCtrl',
            data: {
                title: 'Access Control'  
            },
            requireLogin: true,
			adminOnly: true
		})
		.state('main.roleMapping', {
			url: 'access/rolemapping',
            templateUrl: 'assets/shared/pages/access_control/add_role_mapping.html',
            data: {
                title: 'Access Control'  
            },
			resolve: {
                fetchedUsers: ['User', function(User){
                    return User.find();
                }],
                fetchedRoles: function(){
                    return 'test2';
                }
			},
            controller: 'AccessCtrl',
            requireLogin: true,
			adminOnly: true
		});
}])
.run(['$rootScope', '$http', 'Auth', '$state', 'User', function($rootScope, $http, Auth, $state, User){
    
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
        if(!!toState.requireLogin && !Auth.currentUser){
            event.preventDefault();
            $state.go('login');
        }

    });
    
    $rootScope.$on('$stateChangeSuccess', function(event, toState){
      $rootScope.pageTitle = toState.data.title;
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