'use strict'

/* App Module */
var ba = angular.module('lpkbb', [
    'ngMaterial',
    'ui.router',
    'landingPage'
])


ba.config(["$httpProvider", '$locationProvider',function($httpProvider, $locationProvider){
    //$locationProvider.html5Mode(true)
}])

//On Init of webapp
ba.run(['$rootScope', '$location', '$http', function ($rootScope, $location, $http) {

}])
