angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

        
  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "app.html"
    })
    .state('app.home', {
      url: "/home",
      views: {
        'appContent' :{
          templateUrl: "home.html",
          controller : "HomeController"
        }
      }
    })
  
  $urlRouterProvider.otherwise("/app/home");
})

.controller('AppController', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
    $scope.toggleRight = function() {
    $ionicSideMenuDelegate.toggleRight();
  };
})

.controller("HomeController", function($scope) {
  
})

.controller("CartController", function($scope, $http) {
  
  $scope.data = {
    items : []
  };
  
	var params = { text: '', type: 1, StartIndex: 0, Count: 1000 };
    $http.get(
        "http://24.105.66.139:8061/" + 'api/Modules/GetModules',
        { params: params }
    ).then(function (data) {
        console.log(data)
    });
  
})

.directive("ionCart", function() {
  return {
    restrict : "E",
    templateUrl : "ionCart.html"
  }
})

.directive("ionPurchase", function() {
  return {
    restrict : "E",
    template : "<h2>This is Ion Purchase</h2>"
  }
})