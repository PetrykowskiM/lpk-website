intern.controller("adminCtrl", ["$scope", "$state", function($scope, $state){
    $scope.selectedIndex = 0
    $state.go("intern.neuigkeiten")

    switch($state.current.name){
        case 'intern.neuigkeiten':
            $scope.selectedIndex = 0
            break;
        case 'intern.termine':
            $scope.selectedIndex = 1
            break;
        case 'intern.veranstaltungen':
            $scope.selectedIndex = 2
            break;
    }

    $scope.selected = function(tab){
        switch(tab){
            case 'Neuigkeiten':
                $state.go("intern.neuigkeiten")
                break;
            case 'Termine':
                $state.go("intern.termine")
                break;
            case 'Veranstaltungen':
                $state.go("intern.veranstaltungen")
                break;
            default: break;
        }
    }
}])