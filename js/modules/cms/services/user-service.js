angular.module('CMS')
.factory('User', ['$resource', function($resource){
	return $resource(
        "/users/:Id",
        {Id: "@Id" },
        {
            "login": {
            	'method': 'POST',
            	'url': '/users/login'
            },
            "me": {
            	'method': 'GET',
            	'url': '/users/me'
            },
            "logout": {
            	'method': 'POST',
            	'url': '/users/logout'
            }
        }
    );
}]);