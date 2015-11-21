intern.controller("adminVorstandCtrl", ["$scope", "$state", "lpk_dataProvider", "$mdToast", "lpk_admin", '$q',
    function($scope, $state, dataProvider, $mdToast, lpk_admin, q) {

    $scope.vorstand = {
        name: "",
        isLeader: false,
        imagePath: "",
        email: "",
        title: ""
    }

    $scope.board = []
    $scope.existingImages = []
    var flowModule = null,
        currentlyEditing = false,
        selectedEntry = 0,
        oldEmail = 0


    dataProvider.getBoard()
        .then(function(board){
            $scope.board = board
        })

    function getIndex(object){
        for(var i=0; i<$scope.board.length; i++){
            if(object == $scope.board[i])
                return i
        }
        return -1
    }

    $scope.selectedEntry = function(object){
        var index = getIndex(object)
        if(!currentlyEditing) {
            currentlyEditing = true
            selectedEntry = index

            var entry = $scope.board[index]
            oldEmail = entry.email

            $scope.existingImages = [entry.imagePath]

            var entryCopy = JSON.parse(JSON.stringify(entry))
            $scope.vorstand = entryCopy
        }
    }


    $scope.cancel = function(){
        $scope.vorstand = {
            name: "",
            isLeader: false,
            imagePath: "",
            email: "",
            title: ""
        }
        if(currentlyEditing){
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
                $scope.vorstand.imagePath = ""
                $scope.existingImages = []
                $scope.save(false)
                //$scope.allNews.splice(index, 1)
            })
    }

    $scope.deleteEntry = function(object, event){
        event.stopPropagation()
        var index = getIndex(object)

        lpk_admin.deleteBoard($scope.board[index])
            .then(function(){
                var promises = []

                //Delete all belonging images
                promises.push(lpk_admin.deleteImage($scope.board[index].imagePath))

                q.all(promises)
                    .then(function(){
                        $scope.board.splice(index, 1)
                    })
            })
    }

    $scope.fileAdded = function(file, message, flow){
        $scope.vorstand.imagePath = "/" + getDateString() + "/" + file.name
        if(flowModule == null)
            flowModule = flow
    }

    $scope.save = function(shouldClear){

        if ($scope.vorstand.name != "" && $scope.vorstand.title != "") {

            $scope.vorstand.oldEmail = oldEmail

            if (flowModule) {
                flowModule.upload()
            }

            if(!currentlyEditing) {
                lpk_admin.addBoard(JSON.parse(JSON.stringify($scope.vorstand)))
                $scope.board.push($scope.vorstand)
            }else{
                var copy = JSON.parse(JSON.stringify($scope.vorstand))

                lpk_admin.updateBoard(JSON.parse(JSON.stringify($scope.vorstand)))
                    .then(function(){
                        $scope.board[selectedEntry] = copy
                    })

            }

            if(shouldClear == null || shouldClear){

                $scope.vorstand = {
                    name: "",
                    isLeader: false,
                    imagePath: "",
                    email: "",
                    title: ""
                }
                $scope.existingImages = []
                currentlyEditing = false
                if(flowModule)
                    flowModule.files = []
            }else {
            }


        } else {
            $mdToast.show(
                $mdToast.simple()
                    .content('Es muss mindestens der Name sowie die Agentur im Eintrag enthalten sein!')
                    .hideDelay(5000)
            );
        }

    }

    function getDateString(){
        var date = new Date()
        return date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear()
    }


}])