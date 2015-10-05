ba.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('graphAnalyser', {
            url: '/',
            views: {
                '':{
                    controller: 'landingPageCtrl',
                    templateUrl: 'components/landingPage/landingPageView.html'
                }
            }

        })
});