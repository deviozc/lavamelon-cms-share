/**
 * shared header bar Directive
 * @see http://tobiasahlin.com/spinkit/
 */
angular.module('CMS').directive('headerBar', ['Auth', '$state','$rootScope', headerBar]);

function headerBar (Auth, $state, $rootScope) {
    var directive = {
        restrict: 'AE',
        templateUrl: 'assets/shared/js/modules/cms/directives/partials/header-bar.html',
        link: function(scope){
            if(Auth.currentUser){
                scope.user = Auth.currentUser;
            }
            else{
                //$state.go('login');
            }
            
            scope.logout = function(){
                $rootScope.logout();
            };
        }
        
    };
    return directive;
}