angular.module('CMS')
    .factory('Site', ['$resource','sharedConstants',
        function($resource, sharedConstants) {
            return $resource(
                sharedConstants.ROOT_ENDPOINT + "/sites/:Id", {
                    Id: "@Id"
                },
                {
                    'query':  {
                        'method':'GET',
                        isArray:true
                    }
                }
            );
        }
    ]);