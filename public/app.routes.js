ba.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/verein');
    
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

        .state('intern', {
            url: '/admin',
            views: {
                '':{
                    controller: 'adminCtrl',
                    templateUrl: 'components/intern/admin.html'
                }
            }

        })
});