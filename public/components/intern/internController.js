var intern = angular.module('intern', ['flow'])

intern.controller("internCtrl", ["$scope", "$state", 'lpk_admin', function($scope, $state, adminService){
    $scope.user = ""
    $scope.password = ""

    adminService.loggedIn()
        .then(function(){
            $state.go("intern")
        })


    $scope.login = function(){
        var token = ""
        token = btoa($scope.user.toLowerCase() + $scope.password)

        adminService.login(token)
            .then(function(){
                window.localStorage.setItem("authToken", token)

                $state.go("intern")
            })
    }


}])