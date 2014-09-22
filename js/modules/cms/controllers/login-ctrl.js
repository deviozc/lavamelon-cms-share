/**
 * Master Controller
 */
angular.module('CMS').controller('LoginCtrl', ['$scope', 'User', '$location', 'Auth', '$state', LoginCtrl]);

function LoginCtrl($scope, User, $location, Auth, $state) {
    $scope.credentials = {
        "email": "test@test.com",
        "password": "test"
    };
    $scope.login = function () {
        $scope.loginResult = User.login({
            include: 'user',
            rememberMe: true
        }, $scope.credentials, function (data) {
            Auth.currentUser = $scope.loginResult.user;
            $state.go('main.dashboard');
        }, function (res) {
            $scope.loginError = res.data.error;
        });
    };
}