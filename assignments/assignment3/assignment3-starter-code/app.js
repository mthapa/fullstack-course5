( function(){
  'use strict';
  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective)
  .constant('MenuBasePath', "https://davids-restaurant.herokuapp.com");

  

/* FoundItemsDirective */

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'menuList.html',
    scope: {
      items: '<',       
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
} 

function FoundItemsDirectiveController() {
  var list = this;  
}


  /* NarrowItDownController  */
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController (MenuSearchService) {
    var menu = this;
    var items=[];
    
    menu.searchMenu = function (searchTerm) {
      console.log("search term "+ searchTerm);
    var promise = MenuSearchService.getMatchedMenuItems();

    promise.then(function (response) {
      /* Return all menu if  searchTerm is empty */
      if (searchTerm == undefined){
         items=response.data.menu_items;
         menu.found = items;
         //console.log(items.length);
        return;
      }else{              
        menu.categories = response.data.menu_items;
        items=[];

        //Filter by the search term and push it into the array
        for (var i = 1; i < menu.categories.length; i++){      
          if (menu.categories[i]['description'].indexOf(searchTerm.toLowerCase())!= -1){
            items.push(menu.categories[i]);         
          }        
        }  
        //console.log(items.length);
        menu.found = items;
      }
    }
    )
    .catch(function (error) {
      console.log(error);
    })
    };


    /* Remove from the found */
    menu.removeMenu = function (index){
      items.splice(index,1);
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
