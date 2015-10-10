var intern = angular.module('intern', ['flow'])

intern.controller("internCtrl", ["$scope", "$state", function($scope, $state){
    $scope.login = function(){
        $state.go("intern")
    }
}])