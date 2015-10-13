landingPage.provider('lpk_dataProvider', function(){

    function dataProvider($http, $q) {
        this.getNews = function(){
            var deferred = $q.defer()

            $http.get('/news', {})
                .success(function (news) {

                    deferred.resolve(news)
                }, function (err) {
                    console.log("could not load news. Following error occured: \n", err)
                    return {}
                })

            return deferred.promise
        },

        this.getEvents = function(){
            var deferred = $q.defer()

            $http.get('/events', {})
                .success(function (news) {

                    deferred.resolve(news)
                }, function (err) {
                    console.log("could not load news. Following error occured: \n", err)
                    return {}
                })

            return deferred.promise
        }
    }

    this.$get = ['$http','$q', function($http, $q) {
        return new dataProvider($http, $q);
    }];

})

