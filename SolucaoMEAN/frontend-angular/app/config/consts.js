(function() {
    angular.module('picpayApp').constant('consts', {
        appName: 'PicPay - FrontEnd de Teste',
        version: '1.0',
        owner: 'Elaine Cristina Rocha',
        year: '2018',
        site: 'http://www.linkedin.com/in/elaine-cristina-rocha-de-oliveira-92a57621',
        apiUrl: 'http://localhost:3003/api',
        oapiUrl: 'http://localhost:3003/oapi',
        userKey: '_app_finduser_picpay'
    }).run(['$rootScope', 'consts', function($rootScope, consts) {
        $rootScope.consts = consts
    }])
})()