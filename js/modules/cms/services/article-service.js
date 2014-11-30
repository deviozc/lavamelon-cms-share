angular.module('CMS')
    .factory('Article', ['$resource','sharedConstants',
        function($resource, sharedConstants) {
            return $resource(
                sharedConstants.ROOT_ENDPOINT + "/articles/:Id", {
                    Id: "@Id"
                }, {
                    "create": {
                        url: sharedConstants.ROOT_ENDPOINT + "/articles",
                        method: "POST",
                    },
                    "find": {
                        url: sharedConstants.ROOT_ENDPOINT + "/articles",
                        method: "GET",
                        isArray: true
                    },
                    "update": {
                        method: "PUT",
                    }
                }
            );
        }
    ]);