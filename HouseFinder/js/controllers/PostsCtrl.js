app.controller('PostsCtrl', function ($scope, $stateParams, ionicMaterialInk, PostsRepository) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();

    var data = PostsRepository.getDataLoadPost();
    PostsRepository.loadPost(data).then(function (daa) {
        $scope.posts = daa.data;
    });
});