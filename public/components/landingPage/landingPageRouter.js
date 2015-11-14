landingPage.config(function($stateProvider, $urlRouterProvider) {

    //$urlRouterProvider.otherwise('/aktuelles');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home.aktuelles', {
            url: 'aktuelles',
            views: {
                'mainContent@home':{
                    controller: 'aktuellesCtrl',
                    templateUrl: 'components/aktuelles/aktuelles.html'
                }
            }

        })

        .state('home.termine', {
            url: 'termine',
            views: {
                'mainContent@home':{
                    controller: 'dateCtrl',
                    templateUrl: 'components/termine/termine.html'
                }
            }

        })

        .state('home.aktivitaeten', {
            url: 'aktivitaeten',
            views: {
                'mainContent@home':{
                    controller: 'aktivitaetenCtrl',
                    templateUrl: 'components/aktivitaeten/aktivitaeten.html'
                }
            }

        })

        .state('home.verein', {
            url: 'verein',
            views: {
                'mainContent@home':{
                    controller: 'vereinCtrl',
                    templateUrl: 'components/verein/verein.html'
                }
            }

        })

        .state('home.mitglied', {
            url: 'mitglied',
            views: {
                'mainContent@home':{
                    controller: 'mitgliedCtrl',
                    templateUrl: 'components/mitglied/mitglied.html'
                }
            }

        })

        .state('home.vorstand', {
            url: 'vorstand',
            views: {
                'mainContent@home':{
                    controller: 'vorstandCtrl',
                    templateUrl: 'components/vorstand/vorstandView.html'
                }
            }

        })

        .state('home.intern', {
            url: 'intern',
            views: {
                'mainContent@home':{
                    controller: 'internCtrl',
                    templateUrl: 'components/intern/intern.html'
                }
            }

        })

        .state('home.impressum', {
            url: 'impressum',
            views: {
                'mainContent@home':{
                    //controller: 'landingPageCtrl',
                    templateUrl: 'components/impressum/impressum.html'
                }
            }

        })
});