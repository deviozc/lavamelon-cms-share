angular.module('CMS')
    .factory('Site', ['$resource',
        function($resource) {
            return $resource(
                "/sites/:Id", {
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