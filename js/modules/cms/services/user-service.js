angular.module('CMS')
    .factory('User', ['$resource',
        function($resource) {
            return $resource(
                "/users/:Id", {
                    Id: "@Id",
                    siteId: '@siteId'
                }, {
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
                    },

                    'mapSite': {
                        'method': 'POST',
                        'url': '/users/:userId/sites/:siteId',
                        'params': {
                            userId: '@userId',
                            siteId: '@siteId'
                        }
                    },
                    'query': {
                        'method': 'GET',
                        isArray: true
                    }
                }
            );
        }
    ]);