import angular from 'angular';
import 'angular-mocks';

import vpGreeting from './vp-greeting';
import { name } from './vp-greeting.config';

describe(`${name} controller`, () => {
    let vm;

    beforeEach(() => {
        angular.mock.module(vpGreeting);
    });

    beforeEach(angular.mock.inject(($injector) => {
        const $componentController = $injector.get('$componentController');
        vm = $componentController(name, {}, { to: 'me' });
        vm.$onInit();
    }));

    test('В контроллере bindings значение vm.to преобразовывается в vm.TO', () => {
        expect(vm.TO).toBe('ME');
    });

    test('При помощи контроллера указываетя значение vm.greet', () => {
        expect(vm.greet).toBeTruthy();
    });
});
