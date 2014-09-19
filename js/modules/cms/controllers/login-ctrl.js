/**
 * Master Controller
 */
angular.module('CMS').controller('LoginCtrl', ['$scope', 'User', '$location', 'Auth', LoginCtrl]);

function LoginCtrl($scope, User, $location, Auth) {
    $scope.credentials = {
        "email": "xingbo828@gmail.com",
        "password": "1234"
    };
    $scope.login = function () {
        $scope.loginResult = User.login({
            include: 'user',
            rememberMe: true
        }, $scope.credentials, function (data) {
            //var next = $location.nextAfterLogin || '/';
            //$location.nextAfterLogin = null;
            //AppAuth.currentUser = $scope.loginResult.user;
            //$location.path(next);
            Auth.currentUser = $scope.loginResult.user;
            console.log(Auth.currentUser);
        }, function (res) {
            $scope.loginError = res.data.error;
        });
    };
}