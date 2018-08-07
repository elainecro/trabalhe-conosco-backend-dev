(function(){
    angular.module('picpayApp').controller('UserCtrl', [
        '$http',
        '$location',
        'msgs',
        'consts',
        UserController
    ])

    function UserController($http, $location, msgs, consts){
        const vm = this
        const url = `${consts.apiUrl}/users`

        vm.find = function() {
            if (!vm.user)  {
                msgs.addError('Informe o nome do usuário para pesquisar')
            } else if (vm.user.name.length < 6) {
                msgs.addError('Preencha no mínimo 6 caracteres para pesquisar.')
            } else {
                const page = parseInt($location.search().page) || 1 //lendo o parâmetro page da querystring ou atribuindo 1 caso não exista

                $http.get(`${url}?name=${vm.user.name}&skip=${(page - 1) * 10}&limit=15`).then(function(response) { //filtros skip e limit do node-restfull
                    vm.users = {}
                    vm.users = response.data
                    //vm.calculateValues()                

                    $http.get(`${url}/counters`).then(function(response) {
                        vm.pages = Math.ceil(response.data[0] .total / 15)
                    })
                })
            }            
        }
    }
})()