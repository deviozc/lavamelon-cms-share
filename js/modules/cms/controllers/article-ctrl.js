/**
 * Master Controller
 */
angular.module('CMS')
.controller('ArticleListCtrl', ['$rootScope','$scope', '$state', 'Article', 'toaster','Auth', ArticleListCtrl])
.controller('ArticleCreateCtrl', ['$rootScope','$scope', '$state', 'Article', 'templates', 'toaster','Auth', ArticleCreateCtrl])
.controller('ArticleEditCtrl', ['$rootScope','$scope', '$state', 'Article','articleToBeUpdated','templates', 'toaster', ArticleEditCtrl]);

function ArticleListCtrl($rootScope, $scope, $state, Article, toaster) {
    var fileter = $state.current.data.articleFilter;
    $scope.doneLoading = false;
	$scope.articles =  Article.find({domain:$rootScope.domain}, function(data){
        $scope.doneLoading = true;
    }, function(err){
        console.log('error');
    });
    
    $scope.delete = function(article){
        Article.delete({Id:article.id}, function(){
            toaster.pop('success', 'Deleted', article.en.title);
            $scope.articles =  Article.find({domain:$rootScope.domain});
        });
    };

}

function ArticleCreateCtrl($rootScope,$scope, $state, Article, templates, toaster, Auth) {
    var fileter = $state.current.data.articleFilter;
    $scope.templates = templates;
	$scope.article = {
        domain: Auth.getCurrentUser().sites[0].domain,
        section: fileter
    };
    $scope.add = function () {
        Article.create($scope.article, function (data) {
            console.log(data);
            toaster.pop('success', 'Added', 'Please attach images now.');
            $state.go('main.newsUpdate',{id:data.id});
        }, function (res) {
            console.log(res);
        });
    };
    
}

function ArticleEditCtrl($rootScope, $scope, $state, Article, articleToBeUpdated, templates, toaster) {

    var updateGallery = function(){
        $scope.doneLoading = false;
            Article.get({Id:articleToBeUpdated.id}, function(data){
                $scope.doneLoading = true;
                $scope.article.images = data.images;
                console.log($scope.article);
            });
    };
    $scope.$on('done-image-upload', function(){
        updateGallery();
    });

    $scope.$on('image-deleted',function(){
        updateGallery();
    });
    
    $scope.article = articleToBeUpdated;
    $scope.article.domain = $rootScope.domain;
    $scope.article.type='article';
    
    $scope.templates = templates;
    $scope.doneLoading = true;
    $scope.update = function(){
        $scope.article.$update({Id:$scope.article.id}).then(function(article){
            $state.go($state.current.data.parent);
            toaster.pop('success', 'Updated', article.en.title + ' has been updated.');
        });
    };
}