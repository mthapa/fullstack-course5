( function(){

  'use strict';

  angular.module('ShoppingListCheckOffApp',[])
  .controller('ToBuyShoppingController',ToBuyShoppingController)
  .controller('AlreadyBoughtShoppingController',AlreadyBoughtShoppingController)
  .provider('ShoppingListCheckOffService', ShoppingListServiceProvider);
 

  /*  ToBuyShoppingController */

  ToBuyShoppingController.$inject = ["$scope","ShoppingListCheckOffService"];

  function ToBuyShoppingController ($scope, ShoppingListCheckOffService){

    var list1 = this;
    list1.items = ShoppingListCheckOffService.GetItems();
    
    var shoppingList = [
      ["Cookies",10],
      ["Sugary Drink",5],
      ["Pepto Bismol",2],
      ["Candy",15]
    ];
  

      var i = 0 ;
      for(i ; i < shoppingList.length; i++){
        ShoppingListCheckOffService.AddItem(shoppingList[i][0], shoppingList[i][1]);
      }

      $scope.onClickBuyButton = function onClickBuyButton(index){
        ShoppingListCheckOffService.RemoveItem(index);
      }
  }


/*  AlreadyBoughtShoppingController  */

AlreadyBoughtShoppingController.$inject = ['$scope', "ShoppingListCheckOffService"];

function AlreadyBoughtShoppingController ($scope, ShoppingListCheckOffService){
  var list2 = this;
  list2.items = ShoppingListCheckOffService.GetBoughtItems();
  console.log("Count Items" + list2.items);


}


/* ShoppingListService */

function ShoppingListService() {
  var service = this;

  var buyItems = [];
  var boughtItems = [];

  service.AddItem = function (itemName, quantity) {

    var item  = {
      name: itemName,
      quantity: quantity
    };

    buyItems.push(item);

  };

  service.RemoveItem = function (itemIndex) {
    boughtItems.push(buyItems[itemIndex]);
    buyItems.splice(itemIndex,1);    
  };


  service.GetItems = function (){
    return buyItems;
  };

  service.GetBoughtItems = function (){
    return boughtItems;
  };

}

/* ShoppingListServiceProvider */

function ShoppingListServiceProvider() {
  var provider = this;

  provider.$get = function () {
    var shoppingList = new ShoppingListService();

    return shoppingList;
  };
}

})();
