landingPage.controller("aktuellesCtrl", ["$scope", "$state", 'lpk_dataProvider','$mdDialog','$sce', function($scope, $state, lpkData, $mdDialog, $sce){

    $scope.allNews = []

    lpkData.getNews()
        .then(function(news){
            for(var i = 0; i<news.length; i++){
                news[i].images = JSON.parse(news[i].images)
                news[i].content = news[i].content.replace(/\n/g, '<br>')
                news[i].contentSafe = $sce.trustAsHtml(news[i].content)
            }
            $scope.allNews = news
            console.log(news)
        })

    lpkData.getEvents()
        .then(function(events){
            for(var i = 0; i<events.length; i++){
                events[i].images = JSON.parse(events[i].images)
                events[i].content = events[i].content.replace(/\n/g, '<br>')
                events[i].contentSafe = $sce.trustAsHtml(events[i].content)
            }
            $scope.allNews = $scope.allNews.concat(events)
        })

    $scope.showImage = function(ev, imagePath, newsIndex, imageIndex){
        console.log(newsIndex, imageIndex)
        $mdDialog.show({
            controller: ImageViewerController,
            templateUrl: 'components/imageViewer/imageViewerTemplate.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            locals: {
               imagePath: imagePath,
               imageIndex: imageIndex,
               images: $scope.allNews[newsIndex].images
            },
            clickOutsideToClose:true
        })
    }
}])

function ImageViewerController($scope, $mdDialog, imagePath, imageIndex, images){
    console.log(imagePath)
    $scope.imagePath = imagePath
}