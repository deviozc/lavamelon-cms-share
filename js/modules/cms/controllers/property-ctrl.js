/**
 * Master Controller
 */
angular.module('CMS')
.controller('PropertyListCtrl', ['$rootScope','$scope', '$state', 'Property', 'toaster','Auth', PropertyListCtrl])
.controller('PropertyCreateCtrl', ['$rootScope','$scope', '$state', 'Property', 'templates', 'toaster','Auth', PropertyCreateCtrl])
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

function PropertyCreateCtrl($rootScope,$scope, $state, Property, templates, toaster, Auth) {
    var fileter = $state.current.data.articleFilter;
    $scope.templates = templates;
	$scope.article = {
        domain: Auth.getCurrentUser().sites[0].domain,
        section: fileter
    };
    $scope.add = function () {
        Article.create($scope.article, function (data) {
            console.log(data);
            toaster.pop('success', 'Added', data.en.title);
            $state.go($state.current.data.parent);
        }, function (res) {
            console.log(res);
        });
    };
    
}

function PropertyEditCtrl($rootScope, $scope, $state, Property, propertyToBeUpdated, toaster) {
    $scope.property = propertyToBeUpdated;
    $scope.typeList = ['sold','for_sale'];
    $scope.update = function(){
        $scope.property.$update({Id:$scope.property.id}).then(function(property){
            $state.go($state.current.data.parent);
            toaster.pop('success', 'Updated', 'Property has been updated.');
        });
    };
}