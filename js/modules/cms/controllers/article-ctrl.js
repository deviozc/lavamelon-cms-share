/**
 * Master Controller
 */
angular.module('CMS')
.controller('ArticleListCtrl', ['$scope', '$state', 'Article', ArticleListCtrl])
.controller('ArticleCreateCtrl', ['$scope', '$state', 'Article', 'templates', 'toaster', ArticleCreateCtrl])
.controller('ArticleEditCtrl', ['$scope', '$state', 'Article','articleToBeUpdated','templates', ArticleEditCtrl]);

function ArticleListCtrl($scope, $state, Article) {
    var fileter = $state.current.data.articleFilter;
    $scope.doneLoading = false;
	$scope.articles =  Article.find(function(data){
        console.log('done calling');
        $scope.doneLoading = true;
    }, function(err){
        console.log('error');
    });
    
    $scope.delete = function(article){
        article.$delete().then(function(){
            $scope.articles =  Article.find();
        });
    };

}

function ArticleCreateCtrl($scope, $state, Article, templates, toaster) {
    var fileter = $state.current.data.articleFilter;
    $scope.templates = templates;
	$scope.article = {
        section: fileter,
        date: new Date()
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

function ArticleEditCtrl($scope, $state, Article, articleToBeUpdated, templates) {
    $scope.article = articleToBeUpdated;
    $scope.templates = templates;
    $scope.update = function(){
        console.log($scope.article);
        $scope.article.$update();
    };
}