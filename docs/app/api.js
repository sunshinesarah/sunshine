/**
 * Created by sarahwiltshire on 2017/04/27.
 */

'use strict';

angular.module('docs').controller('ApiController', ApiController);

function ApiController(API_DATA, $state){
    var ctrl = this;
    ctrl.allPages = API_DATA;

    ctrl.collapsed = function(page){
        return $state.current.url.split('/')[2] === page.name;
    };
}
ApiController.$inject = ["API_DATA", '$state'];