landingPage.controller("vorstandCtrl", ["$scope", "lpk_dataProvider", function($scope, lpkData){

    $scope.boardMembers = lpkData.getBoardMembers()

    $scope.satzung = function(){
        window.open('/assets/files/Satzung_lpk-bb.pdf', '_blank')
    }

}])