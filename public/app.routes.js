ba.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/aktuelles');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            views: {
                '':{
                    controller: 'landingPageCtrl',
                    templateUrl: 'components/landingPage/landingPageView.html'
                }
            }

        })
});