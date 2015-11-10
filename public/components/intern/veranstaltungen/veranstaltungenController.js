intern.controller("veranstaltungenCtrl", ["$scope", "$state", "lpk_dataProvider", "$mdToast", "lpk_admin", '$q',
    function($scope, $state, dataProvider, $mdToast, lpk_admin, q){

        $scope.eventEntry = {
            headline: "",
            subheadline: "",
            content: "",
            date: new Date(),
            images: [],
            custom: 0,
            type: "event"
        }

        $scope.allEvents = []
        $scope.existingImages = []
        var flowModule = null,
            currentlyEditing = false,
            selectedEntry = 0,
            oldDate = 0

        dataProvider.getEvents()
            .then(function(events){
                $scope.allEvents = events
            })

        $scope.selectedEntry = function(index){
            if(!currentlyEditing) {
                currentlyEditing = true
                selectedEntry = index

                var entry = $scope.allEvents[index]
                entry.images = JSON.parse(entry.images)
                oldDate = entry.date
                entry.date = new Date(entry.date)

                $scope.existingImages = entry.images

                var entryCopy = JSON.parse(JSON.stringify(entry))
                entryCopy.date = new Date($scope.allEvents[index].date.getTime())
                $scope.eventEntry = entryCopy
                console.log($scope.eventEntry)
            }
        }


        $scope.cancel = function(){
            $scope.eventEntry = {
                headline: "",
                subheadline: "",
                content: "",
                date: new Date(),
                images: [],
                custom: 0
            }
            if(currentlyEditing){
                $scope.allEvents[selectedEntry].date = $scope.allEvents[selectedEntry].date.getTime()
                currentlyEditing = false
                $scope.existingImages = []
                selectedEntry = 0
            }
        }

        $scope.deleteFile = function(event, index){
            event.stopPropagation()
            flowModule.files.splice(index, 1)
        }

        $scope.deleteFileExisting = function(event, index){
            event.stopPropagation()

            //Send request to delete File
            lpk_admin.deleteImage($scope.existingImages[index])
                .then(function(){
                    $scope.eventEntry.images.splice(index, 1)
                    $scope.existingImages.splice(index,1)
                    $scope.save(false)
                })
        }

        $scope.deleteEntry = function(index, event){
            event.stopPropagation()

            lpk_admin.deleteEntry($scope.allEvents[index])
                .then(function(){
                    var promises = []

                    //Delete all belonging images
                    var images
                    if(typeof $scope.allEvents[index].images == 'string')
                        images = JSON.parse($scope.allEvents[index].images)
                    else
                        images = $scope.allEvents[index].images
                    for(var imageIndex in images){
                        promises.push(lpk_admin.deleteImage(images[imageIndex]))
                    }

                    q.all(promises)
                        .then(function(){
                            $scope.allEvents.splice(index, 1)
                        })
                })
        }

        $scope.fileAdded = function(file, message, flow){
            $scope.eventEntry.images.push("/" + getDateString() + "/" + file.name)
            if(flowModule == null)
                flowModule = flow
        }

        $scope.save = function(shouldClear){

            if ($scope.eventEntry.headline != "" && $scope.eventEntry.content != "") {
                $scope.eventEntry.images = JSON.stringify($scope.eventEntry.images)


                if(typeof $scope.eventEntry.date != 'object')
                    $scope.eventEntry.date = new Date($scope.eventEntry.date)

                $scope.eventEntry.date.setHours(0)
                $scope.eventEntry.date.setMinutes(0)
                $scope.eventEntry.date.setSeconds(0)
                $scope.eventEntry.date.setMilliseconds(0)

                $scope.eventEntry.date = $scope.eventEntry.date.getTime() + Math.floor(Math.random() * 86400000)
                $scope.eventEntry.oldDate = oldDate

                if (flowModule) {
                    flowModule.upload()
                }

                if(!currentlyEditing) {
                    lpk_admin.addEvents(JSON.parse(JSON.stringify($scope.eventEntry)))
                    $scope.allEvents.push($scope.eventEntry)
                }else{
                    var copy = JSON.parse(JSON.stringify($scope.eventEntry))
                    copy.date = new Date($scope.eventEntry.date)

                    lpk_admin.updateEvents(JSON.parse(JSON.stringify($scope.eventEntry)))
                        .then(function(){
                            $scope.allEvents[selectedEntry] = copy
                        })

                }

                if(shouldClear == null || shouldClear){

                    $scope.eventEntry = {
                        headline: "",
                        subheadline: "",
                        content: "",
                        date: new Date(),
                        images: [],
                        custom: 0
                    }
                    $scope.existingImages = []
                    currentlyEditing = false
                    if(flowModule)
                        flowModule.files = []
                }else {
                    $scope.eventEntry.date = new Date($scope.eventEntry.date)
                    $scope.eventEntry.images = JSON.parse($scope.eventEntry.images)
                }


            } else {
                $mdToast.show(
                    $mdToast.simple()
                        .content('Es muss mindestens ein Titel sowie ein Inhalt im Eintrag enthalten sein!')
                        .hideDelay(5000)
                );
            }

        }

        function getDateString(){
            var date = new Date()
            return date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear()
        }

    }])