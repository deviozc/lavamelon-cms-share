
angular.module('CMS').directive('thumbnail', thumbnail);

function thumbnail () {
    var directive = {
        restrict: 'AE',
        require: '^gallery',
        templateUrl: 'assets/shared/js/modules/cms/directives/partials/thumbnail.html',
        link: function($scope, iElm, iAttrs, galleryController){
            $scope.imageSrc = 'http://'+iAttrs.imageSource;
            $scope.fileId = iAttrs.fileId;
            $scope.filename = iAttrs.fileName;
            $scope.doneLoading = false;
            var image = iElm.find('img'),
                loadHandler = function(){
                $scope.height = image[0].naturalHeight;
                $scope.width = image[0].naturalWidth;
                $scope.doneLoading = true;
            };
            image.bind('load', loadHandler);
            $scope.$on('$destroy', function() {
                iElm.off('load', loadHandler);
            });
            galleryController.addImage($scope);
            $scope.deleteImage = function(e){
                e.preventDefault();
                galleryController.deleteImage($scope);
            };
        }
    };
    return directive;
}