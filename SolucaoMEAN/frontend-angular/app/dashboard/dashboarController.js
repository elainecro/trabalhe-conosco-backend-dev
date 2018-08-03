(function(){
    angular.module('picpayApp').controller('DashboardCtrl', [
        '$http',
        'consts',
        DashboardController
    ])
    
    
    function DashboardController($http, consts){
        const vm = this
    
        vm.getSummary = function(){
            const url = `${consts.apiUrl}/counters`
            
            vm.loading = true

            $http.get(url).then(function(response){
                const {total = 0, relevancia1 = 0, relevancia2 = 0} = response.data            
                vm.total = total
                vm.relevancia1 = relevancia1
                vm.relevancia2 = relevancia2
            }).finally(function(){
                vm.loading = false
            })
        }
    
        vm.getSummary()
    }
})()