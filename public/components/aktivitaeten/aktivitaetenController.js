landingPage.controller("aktivitaetenCtrl", ["$scope", 'lpk_dataProvider', '$mdDialog', function($scope, lpkData, $mdDialog){

    $scope.aktivitaeten = []

    lpkData.getEvents()
        .then(function(events){
            for(var i = 0; i<events.length; i++){
                events[i].images = JSON.parse(events[i].images)
            }
            $scope.aktivitaeten = events
        })

    $scope.showImage = function(ev, imagePath, newsIndex, imageIndex){
        $mdDialog.show({
            controller: ImageViewerController,
            templateUrl: 'components/imageViewer/imageViewerTemplate.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            locals: {
                imagePath: imagePath,
                imageIndex: imageIndex,
                images: $scope.aktivitaeten[newsIndex].images
            },
            clickOutsideToClose:true
        })
    }



}])

function ImageViewerController($scope, $mdDialog, imagePath, imageIndex, images){
    console.log(imagePath)
    $scope.imagePath = imagePath
}