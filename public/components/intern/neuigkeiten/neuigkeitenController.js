intern.controller("neuigkeitenCtrl", ["$scope", "$state", "lpk_dataProvider", "$mdToast", "lpk_admin", '$q',
    function($scope, $state, dataProvider, $mdToast, lpk_admin, q){

    $scope.newsEntry = {
        headline: "",
        subheadline: "",
        content: "",
        date: new Date(),
        images: [],
        custom: 0
    }

    $scope.allNews = []
    $scope.existingImages = []
    var flowModule = null,
        currentlyEditing = false,
        selectedEntry = 0,
        oldDate = 0

    dataProvider.getNews()
        .then(function(news){
            $scope.allNews = news
        })

    $scope.selectedEntry = function(index){
        if(!currentlyEditing) {
            currentlyEditing = true
            selectedEntry = index

            var entry = $scope.allNews[index]
            entry.images = JSON.parse(entry.images)
            oldDate = entry.date
            entry.date = new Date(entry.date)

            $scope.existingImages = entry.images

            var entryCopy = JSON.parse(JSON.stringify(entry))
            entryCopy.date = new Date($scope.allNews[index].date.getTime())
            $scope.newsEntry = entryCopy
            console.log($scope.newsEntry)
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
                $scope.newsEntry.images.splice(index, 1)
                $scope.existingImages.splice(index,1)
                $scope.save(false)
            })
    }

    $scope.deleteEntry = function(index, event){
        event.stopPropagation()

        lpk_admin.deleteEntry($scope.allNews[index])
            .then(function(){
                var promises = []

                //Delete all belonging images
                var images = JSON.parse($scope.allNews[index].images)
                for(var imageIndex in images){
                    promises.push(lpk_admin.deleteImage(images[imageIndex]))
                }

                q.all(promises)
                    .then(function(){
                        $scope.allNews.splice(index, 1)
                    })
            })
    }

    $scope.fileAdded = function(file, message, flow){
        $scope.newsEntry.images.push("/" + getDateString() + "/" + file.name)
        if(flowModule == null)
            flowModule = flow
    }

    $scope.save = function(shouldClear){

            if ($scope.newsEntry.headline != "" && $scope.newsEntry.content != "") {
                $scope.newsEntry.images = JSON.stringify($scope.newsEntry.images)

                if(typeof $scope.newsEntry.date != 'object')
                    $scope.newsEntry.date = new Date($scope.newsEntry.date)

                $scope.newsEntry.date.setHours(0)
                $scope.newsEntry.date.setMinutes(0)
                $scope.newsEntry.date.setSeconds(0)
                $scope.newsEntry.date.setMilliseconds(0)

                $scope.newsEntry.date = $scope.newsEntry.date.getTime() + Math.floor(Math.random() * 86400000)
                $scope.newsEntry.oldDate = oldDate

                if (flowModule) {
                    flowModule.upload()
                }

                if(!currentlyEditing) {
                    lpk_admin.addNews(JSON.parse(JSON.stringify($scope.newsEntry)))
                    $scope.allNews.push($scope.newsEntry)
                }else{
                    var copy = JSON.parse(JSON.stringify($scope.newsEntry))
                    copy.date = new Date($scope.newsEntry.date)

                    lpk_admin.updateNews(JSON.parse(JSON.stringify($scope.newsEntry)))
                        .then(function(){
                            $scope.allNews[selectedEntry] = copy
                        })

                }

                if(shouldClear == null || shouldClear){

                    $scope.newsEntry = {
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
                    $scope.newsEntry.date = new Date($scope.newsEntry.date)
                    $scope.newsEntry.images = JSON.parse($scope.newsEntry.images)
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