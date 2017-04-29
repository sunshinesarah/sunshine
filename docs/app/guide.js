/**
 * Created by sarahwiltshire on 2017/04/27.
 */

'use strict';

angular.module('docs').controller('GuideController', GuideController);

function GuideController(GUIDE_DATA, $state){
    var ctrl = this;
    ctrl.allPages = GUIDE_DATA;
    ctrl.collapsed = function(page){
        return $state.current.url.split('/type')[0] === '/'+ page.url;
    };
}

GuideController.$inject = ["GUIDE_DATA", '$state'];