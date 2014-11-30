angular.module('CMS')
    .factory('User', ['$resource','sharedConstants',
        function($resource, sharedConstants) {
            return $resource(
                sharedConstants.ROOT_ENDPOINT + "/users/:Id", {
                    Id: "@Id",
                    siteId: '@siteId'
                }, {
                    "login": {
                        'method': 'POST',
                        'url': sharedConstants.ROOT_ENDPOINT + '/users/login'
                    },
                    "me": {
                        'method': 'GET',
                        'url': sharedConstants.ROOT_ENDPOINT + '/users/me'
                    },
                    "logout": {
                        'method': 'POST',
                        'url': sharedConstants.ROOT_ENDPOINT + '/users/logout'
                    },

                    'mapSite': {
                        'method': 'POST',
                        'url': sharedConstants.ROOT_ENDPOINT + '/users/:userId/sites/:siteId',
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