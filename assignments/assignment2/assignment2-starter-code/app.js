( function(){

  'use strict';

  angular.module('ShoppingListCheckOffApp',[])
  .controller('ToBuyShoppingController',ToBuyShoppingController)
  .controller('AlreadyBoughtShoppingController',AlreadyBoughtShoppingController)
  .factory('ShoppingListFactory', ShoppingListFactory);

  /*  ToBuyShoppingController */

  ToBuyShoppingController.$inject = ["$scope","ShoppingListFactory"];

  function ToBuyShoppingController ($scope, ShoppingListFactory){


    $scope.message ="Hello!";

    var list1 = this;
    var toBuyList = ShoppingListFactory();
    list1.items = toBuyList.GetItems();

    var shopingList = [
      ["Cookies",10],
      ["Sugary Drink",5],
      ["Pepto Bismol",2],
      ["Candy",15]
    ];

      toBuyList.AddItem("candy", 12);

      console.log("Hello from controller");

    for(i = 0 ; i < shopingList.length; i++){
    //toBuyList.AddItem(shopingList[i][0], shopingList[i][1]);
    console.log(shopingList[i][0]);
  }


  }


/*  AlreadyBoughtShoppingController  */

AlreadyBoughtShoppingController.$inject = ['$scope', "ShoppingListFactory"];

function AlreadyBoughtShoppingController ($scope, ShoppingListFactory){
  var list2 = this;
  var alreadyBoughtList = ShoppingListFactory();

}





/* ShoppingListService */

function ShoppingListService() {
  var service = this;

  var items = [];

  service.AddItem = function (itemName, quantity) {
      console.log("Hello from AddItem");
    var item  = {
      name: itemName,
      quantity: quantity
    };

    items.push(item);

  };

  service.RemoveItem = function (itemIndex) {
    items.splice(itemIndex,1);
  };


  service.GetItems = function (){
    return items;
  };

}

/* ShoppingListFactory */

function ShoppingListFactory(){
  var factory = function () {
    return new ShoppingListService();
  };
  return factory;
}

})();
