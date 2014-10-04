/**
 * Master Controller
 */
angular.module('CMS')
.controller('ArticleListCtrl', ['$scope', '$state', 'Article', 'toaster','Auth', ArticleListCtrl])
.controller('ArticleCreateCtrl', ['$scope', '$state', 'Article', 'templates', 'toaster','Auth', ArticleCreateCtrl])
.controller('ArticleEditCtrl', ['$scope', '$state', 'Article','articleToBeUpdated','templates', 'toaster', ArticleEditCtrl]);

function ArticleListCtrl($scope, $state, Article, toaster) {
    var fileter = $state.current.data.articleFilter;
    $scope.doneLoading = false;
	$scope.articles =  Article.find(function(data){
        $scope.doneLoading = true;
    }, function(err){
        console.log('error');
    });
    
    $scope.delete = function(article){
        article.$delete().then(function(){
            toaster.pop('success', 'Deleted', article.en.title);
            $scope.articles =  Article.find();
        });
    };

}

function ArticleCreateCtrl($scope, $state, Article, templates, toaster, Auth) {
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

function ArticleEditCtrl($scope, $state, Article, articleToBeUpdated, templates, toaster) {
    $scope.article = articleToBeUpdated;
    $scope.templates = templates;
    $scope.update = function(){
        $scope.article.$update({Id:$scope.article.id}).then(function(article){
            $state.go($state.current.data.parent);
            toaster.pop('success', 'Updated', article.en.title + ' has been updated.');
        });
    };
}