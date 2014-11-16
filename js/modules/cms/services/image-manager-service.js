angular.module('CMS')
    .factory('Image', ['$resource',
        function($resource) {
            return $resource(
                "/sites/:domain/images", {
                    domain: "@domain"
                }, {
                    'deleteImage': {
                        'method': 'DELETE',
                        'url': '/files/:fileId',
                        'isArray': true,
                        'params': {
                            fileId: '@fileId'
                        }
                    },
                    "get": {
                        'method': "GET",
                        'isArray': true
                    },
                }
            );
        }
    ]);