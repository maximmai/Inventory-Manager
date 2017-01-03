'use strict';

// Tell angular about our dependencies
angular.module('app', [
  'ngRoute',
  'formsAngular',
  'ui.router'
])
.config(function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
});


angular.module('app').controller('MainController', ['$scope', '$stateParams', '$location', '$http',
  function ($scope, $stateParams, $location, $http) {
    $scope.label = function(label){
      var ngclass = "";
      switch (label) {
          case "OPEN":
              ngclass = "label label-success";
              break;
          case "DELIVERED":
              ngclass = "label label-info";
              break;
          case "CLOSED":
              ngclass = "label label-default";
              break;
          case "CANCELLED":
              ngclass = "label label-default";
              break;
          case "PAID":
              ngclass = "label label-warning";
              break;
      }
      return ngclass;
    };


    $scope.get_invoices = function(){
      $scope.inventories = null;
      $http.get('/api/Invoice').success(function (response){
        $scope.invoices = response;
      });
    };

    $scope.get_inventories = function(){
      $scope.invoices = null;
      $http.get('/api/Inventory').success(function (response){
        $scope.inventories = response;
      });
    };
  }
]);




// Now configure forms-angular
formsAngular.config(['routingServiceProvider', function (routingService) {
  routingService.start(
    {
      routing: 'ngroute',      // specify the routing we are using
      // In this simple example we define just one fixed route (the dynamic routes for CRUD will be created by forms-angular)
      fixedRoutes: [
        {route: '/', options: {templateUrl: '/landing-page.html'}}
      ]
    }
  );
}]);
