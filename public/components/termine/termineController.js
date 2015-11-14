landingPage.controller("dateCtrl", ["$scope", "lpk_dataProvider", function($scope, lpkData){

    $scope.allDates = []

    lpkData.getDates()
        .then(function(dates){
            $scope.allDates = dates
        })

}])