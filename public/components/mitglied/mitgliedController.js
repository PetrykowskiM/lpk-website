landingPage.controller("mitgliedCtrl", ['$scope', function($scope){

    $scope.antrag = function(){
        window.open('/assets/files/aufnahmeantrag.pdf', '_blank')
    }

}])