angular.module('CMS')
    .factory('Image', ['$resource','sharedConstants',
        function($resource, sharedConstants) {
            return $resource(
                sharedConstants.ROOT_ENDPOINT + "/sites/:domain/images", {
                    domain: "@domain"
                }, {
                    'deleteImage': {
                        'method': 'DELETE',
                        'url': sharedConstants.ROOT_ENDPOINT + '/files/:fileId',
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