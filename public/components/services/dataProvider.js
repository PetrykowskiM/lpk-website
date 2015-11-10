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

        this.getDates = function(){
            var deferred = $q.defer()

            $http.get('/dates', {})
                .success(function (dates) {

                    deferred.resolve(dates)
                }, function (err) {
                    console.log("could not load dates. Following error occured: \n", err)
                    return {}
                })

            return deferred.promise
        }

        this.getBoardMembers = function(){
            return [
                {
                    name: "Benjamin Lassiwe",
                    isLeader: true,
                    publisher: "Lausitzer Rundschau",
                    mail: "b.lassiwe@lpk-brandenburg.de",
                    image: "/assets/img/Boardmembers/banjamin_lassiwe.jpg"
                },
                {
                    name: "Gunnar Krüger",
                    isLeader: false,
                    publisher: "ZDF",
                    mail: "g.krueger@lpk-brandenburg.de",
                    image: ""
                },
                {
                    name: "Amelie Ernst",
                    isLeader: false,
                    publisher: "Rundfunk Berlin Brandenburg",
                    mail: "e.ernst@lpk-brandenburg.de",
                    image: "/assets/img/Boardmembers/amelie_ernst.jpg"
                },
                {
                    name: "Klaus Peters",
                    isLeader: false,
                    publisher: "dpa",
                    mail: "k.peters@lpk-brandenburg.de",
                    image: "assets/img/Boardmembers/klaus_peters.jpg"
                },
                {
                    name: "Yvonne Jennerjahn",
                    isLeader: false,
                    publisher: "epd",
                    mail: "y.jennerjahn@lpk-brandenburg.de",
                    image: ""
                },
                {
                    name: "Gudrun Mallwitz",
                    isLeader: false,
                    publisher: "Berliner Morgenpost",
                    mail: "g.mallwitz@lpk-brandenburg.de",
                    image: "assets/img/Boardmembers/gudrun_mallwitz.jpg"
                },
                {
                    name: "Torsten Sydow",
                    isLeader: false,
                    publisher: "rbb",
                    mail: "t.sydow@lpk-brandenburg.de",
                    image: ""
                }

            ]
        }
    }

    this.$get = ['$http','$q', function($http, $q) {
        return new dataProvider($http, $q);
    }];

})

