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
        case 'intern.vorstand':
            $scope.selectedIndex = 3
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
            case 'Home':
                $state.go("home.verein")
                break;
            case 'Vorstand':
                $state.go("intern.vorstand")
                break;
            case 'Logout':
                window.localStorage.removeItem("authToken")
                $state.go("home.verein")
                break;
            default: break;
        }
    }

    $scope.goHome = function(){
        $state.go("home.verein")
    }
}])