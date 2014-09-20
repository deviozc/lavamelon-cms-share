/**
 * Master Controller
 */
angular.module('CMS').controller('AccessCtrl', ['$scope', 'User', '$state', 'Auth', 'Role', 'fetchedUsers', 'fetchedRoles', AccessCtrl]);

function AccessCtrl($scope, User, $state, Auth, Role, fetchedUsers, fetchedRoles) {
    $scope.register = function () {
        $scope.user = User.save($scope.registration, function (data) {
            console.log('registered');
        }, function (res) {
            console.log(res);
        });
    };
    
    
    $scope.addRole = function () {
        $scope.newRole = Role.save($scope.role, function (data) {
            console.log('role added');
        }, function (res) {
            console.log(res);
        });
    };
    
    $scope.mapRole = function () {
        console.log(fetchedUsers);
        console.log(fetchedRoles);
    };
}