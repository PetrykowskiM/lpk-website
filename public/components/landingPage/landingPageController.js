var landingPage = angular.module('landingPage', [])

landingPage.controller("landingPageCtrl", ['$scope', '$interval', '$mdSidenav', '$mdMedia','$state', function($scope, $interval, $mdSidenav, $mdMedia, $state){

    $scope.menuItems = {
        aktuelles: {
            state: "home.aktuelles",
            text: "Aktuelles",
            selected: false
        },
        termine: {
            state: "home.termine",
            text: "Termine",
            selected: false
        },
        aktivitaeten: {
            state: "home.aktivitaeten",
            text: "Aktivitäten",
            selected: false
        },
        verein: {
            state: "home.verein",
            text: "Verein",
            selected: false
        },
        mitglied: {
            state: "home.mitglied",
            text: "Mitglied",
            selected: false
        }
    }

    //Select correct menuitem according to State
    switch($state.current.name){
        case "home.termine":
            $scope.menuItems.termine.selected = true
            break;
        case "home.aktuelles":
            $scope.menuItems.aktuelles.selected = true
            break;
        case "home.aktivitaeten":
            $scope.menuItems.aktivitaeten.selected = true
            break;
        case "home.verein":
            $scope.menuItems.verein.selected = true
            break;
        case "home.mitglied":
            $scope.menuItems.mitglied.selected = true
            break;
        case "home":
            $state.go("home.aktuelles")
            $scope.menuItems.aktuelles.selected = true
            break;
    }

    $scope.openLeftMenu = function() {
        $mdSidenav('left').toggle();
    };

    $scope.isLarge = function(){
        return $mdMedia("gt-lg")
    }

    $scope.goTo = function(state, key){
        $state.go(state)
        $mdSidenav('left').toggle();

        for(var entry in $scope.menuItems){
            $scope.menuItems[entry].selected = false
        }
        $scope.menuItems[key].selected = true
    }
}])