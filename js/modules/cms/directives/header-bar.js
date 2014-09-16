/**
 * shared header bar Directive
 * @see http://tobiasahlin.com/spinkit/
 */
angular.module('CMS').directive('headerBar', ['Auth', '$state', headerBar]);

function headerBar (Auth, $state) {
    var directive = {
        restrict: 'AE',
        templateUrl: 'assets/shared/js/modules/cms/directives/partials/header-bar.html',
        link: function(scope){
            if(Auth.isAuthenticated()){
                scope.user = Auth.getUserProfile();
            }
            else{
                //$state.go('login');
            }
            
            scope.logout = function(){
                Auth.logout();
                console.log('test');
            };
        }
        
    };
    return directive;
};