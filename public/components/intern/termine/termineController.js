intern.controller("termineCtrl", ["$scope", "$state", "lpk_dataProvider", "$mdToast", "lpk_admin", function($scope, $state, data, $toast, lpk_admin){

    $scope.currentDate = {
        place: "",
        title: "",
        description: "",
        date: new Date()
    }

    $scope.allDates = []
    var currentlyEditing = false,
        selectedEntry = 0,
        oldDate = 0

    data.getDates()
        .then(function(dates){
            $scope.allDates = dates
        })

    $scope.selectedEntry = function(index){
        if(!currentlyEditing) {
            currentlyEditing = true
            selectedEntry = index

            var entry = $scope.allDates[index]
            oldDate = entry.date
            entry.date = new Date(entry.date)

            var entryCopy = JSON.parse(JSON.stringify(entry))
            entryCopy.date = new Date($scope.allDates[index].date.getTime())
            $scope.currentDate = entryCopy
        }
    }

    $scope.cancel = function(){
        $scope.currentDate = {
            place: "",
            title: "",
            description: "",
            date: new Date()
        }
        if(currentlyEditing){
            $scope.allDates[selectedEntry].date = $scope.allDates[selectedEntry].date.getTime()
            currentlyEditing = false
            selectedEntry = 0
        }
    }

    $scope.deleteDate = function(index, event){
        event.stopPropagation()

        lpk_admin.deleteDate($scope.allDates[index])
            .then(function(){
                $scope.allDates.splice(index, 1)
            })
    }

    $scope.save = function(shouldClear){

        if ($scope.currentDate.title != "" && $scope.currentDate.place != "") {


            if(typeof $scope.currentDate.date != 'object')
                $scope.currentDate.date = new Date($scope.currentDate.date)

            $scope.currentDate.date.setHours(0)
            $scope.currentDate.date.setMinutes(0)
            $scope.currentDate.date.setSeconds(0)
            $scope.currentDate.date.setMilliseconds(0)

            $scope.currentDate.date = $scope.currentDate.date.getTime() + Math.floor(Math.random() * 86400000)
            $scope.currentDate.oldDate = oldDate

            if(!currentlyEditing) {
                lpk_admin.addDate(JSON.parse(JSON.stringify($scope.currentDate)))
                $scope.allDates.push($scope.currentDate)
            }else{
                var copy = JSON.parse(JSON.stringify($scope.currentDate))
                copy.date = new Date($scope.currentDate.date)

                lpk_admin.updateDate(JSON.parse(JSON.stringify($scope.currentDate)))
                    .then(function(){
                        $scope.allDates[selectedEntry] = copy
                    })

            }

            if(shouldClear == null || shouldClear){

                $scope.currentDate = {
                    place: "",
                    title: "",
                    description: "",
                    date: new Date()
                }
                currentlyEditing = false

            }else {
                $scope.currentDate.date = new Date($scope.currentDate.date)
            }


        } else {
            $mdToast.show(
                $mdToast.simple()
                    .content('Es muss mindestens ein Titel sowie ein Ort angegeben werden!')
                    .hideDelay(5000)
            );
        }

    }

}])