( function(){
  'use strict';
  angular.module('LunchCheck',[])
  .controller('LunchCheckController',LunchCheckController);
  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
    $scope.input = "";
    $scope.message ="";
    $scope.myStyle = {};

    $scope.CheckConsumption  = function () {
      if ($scope.input == ""){
          $scope.message ="Please enter data first";
          $scope.myStyle = "red";
      } else{
        var arr = $scope.input.split(',');
        var count =  arr.filter(String).length;
          $scope.myStyle = "green";
        if (count <=3 ) {
          $scope.message =   "Enjoy!";
        }else {
          $scope.message =   "Too Much!";
        }
      }
    };
  }

})();
