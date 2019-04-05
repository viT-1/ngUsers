import angular from 'angular';
import 'angular-mocks';

import vpGreetingModuleName from './index';

// Пример ручного mock'а - подменяем на сервис реализация которого без $http запроса
jest.mock('./vp-greeting.service');

// @link: https://slides.com/tomastrajan/angularjs-unit-testing-with-es6-modules#/7

describe(`${vpGreetingModuleName} controller`, () => {
    let ctrl;
    let $timeout;

    beforeEach(() => {
        angular.mock.module(vpGreetingModuleName);
    });

    beforeEach(angular.mock.inject(($injector) => {
        $timeout = $injector.get('$timeout');
        const $componentController = $injector.get('$componentController');
        ctrl = $componentController(vpGreetingModuleName, {}, { to: 'me' });
        ctrl.$onInit();
    }));

    test('В контроллере bindings значение ctrl.to преобразовывается в ctrl.TO', () => {
        expect(ctrl.TO).toBe('ME');
    });

    test('При помощи контроллера указывается значение ctrl.greet', () => {
        $timeout.flush();

        expect(ctrl.greet).toBeDefined();
    });
});
