'use strict'

$(document).ready(function(){
    $('.parallax').parallax();
});

/* App Module */
var ba = angular.module('ba', [
	'landingPage',
    'ui.router',
])


ba.config(["$httpProvider", '$locationProvider',function($httpProvider, $locationProvider){
    $locationProvider.html5Mode(true)
}])

//On Init of webapp
ba.run(['$rootScope', '$location', '$http', function ($rootScope, $location, $http) {

}])
