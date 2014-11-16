
angular.module('CMS').directive('gallery', ['Image','$rootScope', gallery]);

function gallery (Image, $rootScope) {
    var directive = {
            scope: {}, // {} = isolate, true = child, false/undefined = no change
                controller: function($scope) {
                    var thumbnails = [];
                    this.deleteImage = function(thumbnail) {
                        Image.deleteImage({fileId:thumbnail.fileId}, function(){
                            $rootScope.$broadcast('image-deleted');
                        });
                    };

                    this.addImage = function(thumbnail) {
                        thumbnails.push(thumbnail);
                    };
                },
                // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
                restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
                template: '<div ng-transclude></div>',
                transclude: true,
        
    };
    return directive;
}