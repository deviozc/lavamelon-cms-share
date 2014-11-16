/**
 * Master Controller
 */
angular.module('CMS')
    .controller('AccessAddUserCtrl', ['$scope', 'User', 'toaster', AccessAddUserCtrl])
    .controller('AccessAddSiteCtrl', ['$scope', 'Site', 'toaster', AccessAddSiteCtrl])
    .controller('AccessSiteMapCtrl', ['$scope', 'User', 'fetchedUsers', 'fetchedSites', 'toaster', AccessSiteMapCtrl]);


function AccessAddUserCtrl($scope, User, toaster) {
    $scope.register = function() {
        $scope.user = User.save($scope.registration, function(data) {
            console.log('registered');
            toaster.pop('success', 'User ' + data.fullName + ' has been successfully added.');
            $scope.user = {};
        }, function(res) {
            console.log(res);
            toaster.pop('error', res);
        });
    };
}

function AccessAddSiteCtrl($scope, Site, toaster) {
    $scope.addSite = function() {
        $scope.site = Site.save($scope.site, function(data) {
            toaster.pop('success', 'Site ' + data.domain + ' has been successfully added.');
            $scope.site.domain = '';
        }, function(res) {
            console.log(res);
            toaster.pop('error', res);
        });
    };
}

function AccessSiteMapCtrl($scope, User, fetchedUsers, fetchedSites, toaster) {
    $scope.sites = fetchedSites;
    $scope.users = fetchedUsers;
    $scope.mapSite = function() {
        User.mapSite({
            userId: $scope.siteMapping.userId,
            siteId: $scope.siteMapping.siteId
        }, function(data) {
            toaster.pop('success', 'Mapped');
            $scope.siteMapping = {};
        }, function(res) {
            toaster.pop('error', res);
            console.log(res);
        });
    };
}