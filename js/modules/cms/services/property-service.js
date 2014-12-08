angular.module('CMS')
    .factory('Property', ['$resource','sharedConstants',
        function($resource, sharedConstants) {
            return $resource(
                sharedConstants.ROOT_ENDPOINT + "/properties/:Id", {
                    Id: "@Id"
                }, {
                    "create": {
                        url: sharedConstants.ROOT_ENDPOINT + "/properties",
                        method: "POST",
                    },
                    "find": {
                        url: sharedConstants.ROOT_ENDPOINT + "/properties",
                        method: "GET",
                        isArray: true,
                        'params': {
                            domain: '@domain',
                            agent: '@agent',
                            mls: '@mls'
                        }
                    },
                    "update": {
                        method: "PUT",
                    },
                    "delete": {
                        url: sharedConstants.ROOT_ENDPOINT + "/properties/:Id",
                        method: "DELETE",
                        'params': {
                            Id: '@Id'
                        }
                    }
                }
            );
        }
    ]);