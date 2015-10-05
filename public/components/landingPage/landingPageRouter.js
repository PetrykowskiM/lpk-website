landingPage.config(function($stateProvider, $urlRouterProvider) {

    //$urlRouterProvider.otherwise('/aktuelles');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home.aktuelles', {
            url: 'aktuelles',
            views: {
                'mainContent@home':{
                    //controller: 'landingPageCtrl',
                    templateUrl: 'components/aktuelles/aktuelles.html'
                }
            }

        })

        .state('home.termine', {
            url: 'termine',
            views: {
                'mainContent@home':{
                    //controller: 'landingPageCtrl',
                    templateUrl: 'components/termine/termine.html'
                }
            }

        })

        .state('home.aktivitaeten', {
            url: 'aktivitaeten',
            views: {
                'mainContent@home':{
                    //controller: 'landingPageCtrl',
                    templateUrl: 'components/aktivitaeten/aktivitaeten.html'
                }
            }

        })

        .state('home.verein', {
            url: 'verein',
            views: {
                'mainContent@home':{
                    //controller: 'landingPageCtrl',
                    templateUrl: 'components/verein/verein.html'
                }
            }

        })

        .state('home.mitglied', {
            url: 'mitglied',
            views: {
                'mainContent@home':{
                    //controller: 'landingPageCtrl',
                    templateUrl: 'components/mitglied/mitglied.html'
                }
            }

        })
});