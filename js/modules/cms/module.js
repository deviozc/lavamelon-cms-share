angular.module('CMS', [
    'ui.bootstrap', 
    'ui.router',
    'ngResource', 
    'ngCookies',
    'ngAnimate',
    'toaster', 
    'textAngular',
    'angular-loading-bar',
    'ngUpload'
    ])
.config(['$locationProvider', '$httpProvider', function ($locationProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.interceptors.push(['$q', '$location', 'Auth', function($q, $location, Auth) {
         return {
			'responseError': function(response) {
                if (response.status === 401 || response.status===403){
                    Auth.setCurrentUser(null);
					$location.url('/login');
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
        .state('main.imageManager', {
            url: 'image-manager',
            templateUrl: 'assets/shared/pages/image-manager.html',
            controller: 'imageManagerCtrl',
            data: {
                title: 'Image Manager'  
            },
            requireLogin: true
        })
		.state('main.newUser', {
			url: 'access/newuser',
            templateUrl: 'assets/shared/pages/access_control/add_user.html',
            controller: 'AccessAddUserCtrl',
			data: {
                title: 'Access Control'  
            },
            requireLogin: true,
			adminOnly:true
		})
		.state('main.newSite', {
			url: 'access/newsite',
            templateUrl: 'assets/shared/pages/access_control/add_site.html',
            controller: 'AccessAddSiteCtrl',
            data: {
                title: 'Access Control'  
            },
            requireLogin: true,
			adminOnly: true
		})
		.state('main.siteMapping', {
			url: 'access/sitemapping',
            templateUrl: 'assets/shared/pages/access_control/site_mapping.html',
            data: {
                title: 'Access Control'  
            },
			resolve: {
                fetchedUsers: ['User', function(User){
                    return User.query();
                }],
                fetchedSites: ['Site',function(Site){
                    return Site.query();
                }]
			},
            controller: 'AccessSiteMapCtrl',
            requireLogin: true,
			adminOnly: true
		});
}])
.run(['$rootScope', 'Auth', '$state', 'User', function($rootScope, Auth, $state, User){
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
        if(!!toState.requireLogin && !Auth.getCurrentUser()){
            event.preventDefault();
            Auth.ensureHasCurrentUser(User).then(function(){
                $state.go(toState);
            }, function(){
                $state.go('login');
            });
        }

    });
    
    $rootScope.$on('$stateChangeSuccess', function(event, toState){
      $rootScope.pageTitle = toState.data.title;
    });

    // Logout function is available in any pages
    $rootScope.logout = function(){
      User.logout(function() {
        Auth.setCurrentUser(null);
        $state.go('login');
      });
    };
    
  }]);