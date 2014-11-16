angular.module('CMS')
    .factory('Article', ['$resource',
        function($resource) {
            return $resource(
                "/articles/:Id", {
                    Id: "@Id"
                }, {
                    "create": {
                        url: "/articles",
                        method: "POST",
                    },
                    "find": {
                        url: "/articles",
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