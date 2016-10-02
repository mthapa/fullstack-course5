( function(){
  'use strict';
  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('MenuBasePath', "https://davids-restaurant.herokuapp.com");

  
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController (MenuSearchService) {
    var menu = this;

    var items = [];

    menu.searchMenu = function (searchTerm) {
      console.log("search term "+ searchTerm);
    var promise = MenuSearchService.getMatchedMenuItems();

    promise.then(function (response) {
      items.push('Book');
      items.push('Pen');
      menu.categories = items;
      console.log("Menu Length", response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
    };


   
  }


/* MenuSearchService */
MenuSearchService.$inject = ['$http', 'MenuBasePath']
function MenuSearchService($http, MenuBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (){
    var response = $http({
      method: "GET",
      url: (MenuBasePath + "/menu_items.json")
    });

    return response;
  };
}


})();
