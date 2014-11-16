/**
 * Image Manager Controller
 */
angular.module('CMS').controller('imageManagerCtrl', ['$scope','sharedConstants', '$rootScope','Image',  imageManagerCtrl]);

function imageManagerCtrl($scope, sharedConstants, $rootScope, Image) {
    $scope.domain = $rootScope.domain;
    $scope.data = {
        images: []
    };
    var updateGallery = function(){
        $scope.doneLoading = false;
            Image.get({domain:$scope.domain}, function(data){
                $scope.doneLoading = true;
                $scope.data.images = data;
                console.log(data);
            });
    };
    updateGallery();
    $scope.$on('done-image-upload', function(){
        updateGallery();
    });

    $scope.$on('image-deleted',function(){
        updateGallery();
    });


    
}