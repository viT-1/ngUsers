import angular from 'angular';

// Вспомогательный модуль, добавление в dependency возвращает неподмененный $http
// @link: https://stackoverflow.com/a/26992327

export default angular.module('httpReal', ['ng'])
    .config(($provide) => {
        'ngInject';

        $provide.decorator('$httpBackend', () => angular.injector(['ng']).get('$httpBackend'));
    })
    .service('httpReal', function ($rootScope) {
        'ngInject';

        this.submit = () => {
            $rootScope.$digest();
        };
    });
