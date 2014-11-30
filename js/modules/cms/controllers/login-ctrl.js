/**
 * Master Controller
 */
angular.module('CMS').controller('LoginCtrl', ['$scope', 'User', '$location', 'Auth', '$state', 'toaster' , LoginCtrl]);

function LoginCtrl($scope, User, $location, Auth, $state, toaster) {
    $scope.credentials = {};
    $scope.login = function () {
        $scope.loginResult = User.login($scope.credentials)
        .$promise.then(
            function(user){
            Auth.setCurrentUser(user);
            $state.go('main.dashboard');
        },function(error){
            toaster.pop('error', 'Login Failed', 'Please check your email and password.');
            console.log(error);
        }
        );
        
        //console.log($scope.loginResult);
    };
}