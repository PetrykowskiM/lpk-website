intern.factory('lpk_admin', ['$http', '$rootScope', function($http, $rootScope){
    return {
        addNews: function(newsEntry){
            //$rootScope.$emit("post.remove", {
            //    postId: postId
            //})
            //
            //userProvider.userId()
            //    .then(function(userId){
            //        $http.put('/api/post/forward', {id: postId, type: "USER", to: userId})
            //    })

            return $http.post("/news/add", newsEntry)

        },

        updateNews: function(newsEntry){

            return $http.post("/news/update", newsEntry)

        },

        deleteImage: function(path){
            return $http.post("/deleteImage", {path: path})
        }

    }
}])