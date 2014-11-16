/**
 * Master Controller
 */
angular.module('CMS').controller('LoginCtrl', ['$scope', 'User', '$location', 'Auth', '$state', LoginCtrl]);

function LoginCtrl($scope, User, $location, Auth, $state) {
    $scope.credentials = {
        "email": "xingbo828@gmail.com",
        "password": "123456"
    };
    $scope.login = function () {
        $scope.loginResult = User.login($scope.credentials)
        .$promise.then(function(user){
            Auth.setCurrentUser(user);
            $state.go('main.dashboard');
        });
        
        //console.log($scope.loginResult);
    };
}