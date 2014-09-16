angular.module('CMS').constant('sharedConstants', {
    LOGIN_URL: '/login',
    LOGOUT_URL: '/logout',
    LOGGED_IN: '/loggedin',
    
    //events
    LOGIN_SUCCESS: 'login_success',
    LOGOUT_SUCCESS: 'logout_success',
    LOGIN_FAILED: 'login_failed'
});