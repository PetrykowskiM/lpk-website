landingPage.controller("vorstandCtrl", ["$scope", "lpk_dataProvider", function($scope, lpkData){

    $scope.boardMembers = lpkData.getBoardMembers()

    $scope.satzung = function(){
        window.open('/assets/files/aufnahmeantrag.pdf', '_blank')
    }

}])