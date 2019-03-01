import angular from 'angular';
import 'angular-mocks';

import vpGreetingModuleName from './vp-greeting';

// Пример ручного mock'а - подменяем на сервис реализация которого без $http запроса
jest.mock('./vp-greeting.service');

// @link: https://slides.com/tomastrajan/angularjs-unit-testing-with-es6-modules#/7

describe(`${vpGreetingModuleName} controller`, () => {
    let vm;
    let $timeout;

    beforeEach(() => {
        angular.mock.module(vpGreetingModuleName);
    });

    beforeEach(angular.mock.inject(($injector) => {
        $timeout = $injector.get('$timeout');
        const $componentController = $injector.get('$componentController');
        vm = $componentController(vpGreetingModuleName, {}, { to: 'me' });
        vm.$onInit();
    }));

    test('В контроллере bindings значение vm.to преобразовывается в vm.TO', () => {
        expect(vm.TO).toBe('ME');
    });

    test('При помощи контроллера указываетя значение vm.greet', () => {
        $timeout.flush();

        expect(vm.greet).toBeDefined();
    });
});
