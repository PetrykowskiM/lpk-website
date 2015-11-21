landingPage.controller("vorstandCtrl", ["$scope", "lpk_dataProvider", function($scope, lpkData){

    $scope.boardMembers = []

        lpkData.getBoard()
        .then(function(member){
            $scope.boardMembers = member
        })



}])