/**
 * Master Controller
 */
angular.module('CMS')
.controller('PropertyListCtrl', ['$rootScope','$scope', '$state', 'Property', 'toaster','Auth', PropertyListCtrl])
.controller('PropertyCreateCtrl', ['$rootScope','$scope', '$state', 'Property', 'toaster', PropertyCreateCtrl])
.controller('PropertyEditCtrl', ['$rootScope','$scope', '$state', 'Property','propertyToBeUpdated', 'toaster', PropertyEditCtrl]);

function PropertyListCtrl($rootScope, $scope, $state, Property, toaster) {
    $scope.doneLoading = false;
    $scope.data = {};
    var populateProperties = function(){
        $scope.properties =  Property.find({domain: $rootScope.domain, agent: $rootScope.agentId}, function(data){
            $scope.doneLoading = true;
        }, function(err){
            console.log('error');
        });
    };
    
    populateProperties();
    $scope.searchByMls = function(){
        if(!!$scope.data.mls){
            $scope.doneLoading = false;
            $scope.properties =  Property.find({domain: $rootScope.domain, mls: $scope.data.mls}, function(data){
                $scope.doneLoading = true;
                }, function(err){
                 console.log('error');
            });
        }
    };
    
    $scope.delete = function(property){
        Property.delete({Id:property.id}, function(){
            toaster.pop('success', 'Deleted', 'Property deleted');
            populateProperties();
        });
    };

}

function PropertyCreateCtrl($rootScope, $scope, $state, Property, toaster) {
    $scope.typeList = ['sold','for_sale'];
    
    $scope.property = {
        domain: $rootScope.domain
    };
    $scope.add = function(){
        Property.create($scope.property, function(property){
            $state.go('main.propertyUpdate',{id:property.id});
            toaster.pop('success', 'Updated', 'Property has been added. Please attach property images now.');
        });
    };
    
}

function PropertyEditCtrl($rootScope, $scope, $state, Property, propertyToBeUpdated, toaster) {
    console.log(propertyToBeUpdated);
     
    var updateGallery = function(){
        $scope.doneLoading = false;
        Property.get({Id: propertyToBeUpdated.id}, function(data){
            console.log(data);
            $scope.property.images = data.images;
            $scope.doneLoading = true;
        });
    };
    $scope.$on('done-image-upload', function(){
        updateGallery();
        console.log('ddd');
    });

    $scope.$on('image-deleted',function(){
        updateGallery();
        console.log('eee');
    });
    
    
    
    
    
    
    $scope.property = propertyToBeUpdated;
    $scope.property.domain = $rootScope.domain;
    $scope.property.type = 'property';
    $scope.doneLoading = true;
    $scope.typeList = ['sold','for_sale'];
    $scope.update = function(){
        $scope.property.$update({Id:$scope.property.id}).then(function(property){
            $state.go($state.current.data.parent);
            toaster.pop('success', 'Updated', 'Property has been updated.');
        });
    };
}