(function(){
    angular.module('picpayApp').controller('AuthCtrl', [
        '$location',
        'msgs',
        'auth',
        AuthController
    ])

    function AuthController($location, msgs, auth) {
        const vm = this
        
        vm.loginMode = true
            
        vm.changeMode = () => vm.loginMode = !vm.loginMode

        vm.signin = () => {
            auth.signin(vm.login, err => err ? msgs.addError(err) : $location.path('/'))
        }

        vm.signup = () => {
            auth.signup(vm.login, err => err ? msgs.addError(err) : $location.path('/'))
        }

        vm.getLogin = () => auth.getLogin()

        vm.logout = () => {
            auth.logout(() => $location.path('/'))
        }
    }
})()