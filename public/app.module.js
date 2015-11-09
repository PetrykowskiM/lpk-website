'use strict'

/* App Module */
var ba = angular.module('lpkbb', [
    'ngMaterial',
    'ui.router',
    'landingPage'
])




// register the interceptor as a service
ba.factory('authInterceptor', ['$q', '$location', '$injector', function($q, $location, $injector) {
    return {

        'request': function(config){

          var token = window.localStorage.getItem('authToken')

          if(token)
            config.headers.auth = token

          return config
        },

        // optional method
        'responseError': function(rejection) {
            $injector.invoke(['$http', '$state', function($http, $state) {
                if(rejection.status == 401 && $state.current.name != "home.intern")
                    $state.go('home.verein')
                else {
                }
            }])
            // do something on error
            return $q.reject(rejection)
        }
    }
}])

ba.config(["$httpProvider", '$locationProvider',function($httpProvider, $locationProvider){
    //$locationProvider.html5Mode(true)
    //$httpProvider.defaults.withCredentials = true
    $httpProvider.interceptors.push('authInterceptor')
}])

//On Init of webapp
ba.run(['$rootScope', '$location', '$http', function ($rootScope, $location, $http) {

}])