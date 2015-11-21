intern.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('intern.neuigkeiten', {
            views: {
                'news@intern':{
                    controller: 'neuigkeitenCtrl',
                    templateUrl: 'components/intern/neuigkeiten/neuigkeiten.html'
                }
            }

        })

        .state('intern.termine', {
            views: {
                'dates@intern':{
                    controller: 'termineCtrl',
                    templateUrl: 'components/intern/termine/termine.html'
                }
            }

        })

        .state('intern.veranstaltungen', {
            views: {
                'events@intern':{
                    controller: 'veranstaltungenCtrl',
                    templateUrl: 'components/intern/veranstaltungen/veranstaltungen.html'
                }
            }

        })

        .state('intern.vorstand', {
            views: {
                'events@intern':{
                    controller: 'adminVorstandCtrl',
                    templateUrl: 'components/intern/vorstand/vorstandView.html'
                }
            }

        })
});