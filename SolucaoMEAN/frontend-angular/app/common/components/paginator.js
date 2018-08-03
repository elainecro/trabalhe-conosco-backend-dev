(function() {
    angular.module('picpayApp').component('paginator', {
        bindings: {
            url: '@',
            pages: '@'
        },
        controller: [
            '$location',
            function($location) {
                const vm = this

                vm.$onInit = function() {
                    const cntpages = parseInt(vm.pages) || 1
                    vm.pagesArray = Array(cntpages).fill(0).map((e,i) => i + 1)

                    vm.current = parseInt($location.search().page) || 1
                    vm.needPagination = parseInt(vm.pages) > 1 
                    vm.hasPrev = parseInt(vm.current) > 1
                    vm.hasNext = parseInt(vm.current) < parseInt(vm.pages)  
                    
                }
 
                vm.isCurrent = function(i) {
                    return vm.current == i
                }

                
            }
        ],
        template: `
        <ul ng-if="$ctrl.needPagination" class="pagination pagination-sm no-margin pull-right">
            <li ng-if="$ctrl.hasPrev">
                <a href="{{:: $ctrl.url }}?page={{:: $ctrl.current - 1 }}">Anterior</a>
            </li>
            <li ng-repeat="page in $ctrl.pagesArray" ng-class="{ active : $ctrl.isCurrent(page)}">
                <a href="{{:: $ctrl.url }}?page={{:: page }}">{{:: page }}</a>
            </li>
            <li ng-if="$ctrl.hasNext">
                <a href="{{:: $ctrl.url }}?page={{:: $ctrl.current + 1 }}">Próximo</a>
            </li>
        </ul>
        `
    })
})()