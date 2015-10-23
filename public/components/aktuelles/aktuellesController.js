landingPage.controller("aktuellesCtrl", ["$scope", "$state", 'lpk_dataProvider','$mdDialog', function($scope, $state, lpkData, $mdDialog){

    $scope.allNews = []

    lpkData.getNews()
        .then(function(news){
            for(var i = 0; i<news.length; i++){
                news[i].images = JSON.parse(news[i].images)
            }
            $scope.allNews = news
            console.log(news)
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