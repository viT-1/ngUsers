import angular from 'angular';
import 'angular-mocks';

import routingModuleName from './routing.module';

describe(routingModuleName, () => {
    let module;

    beforeEach(() => {
        angular.mock.module(routingModuleName);
        module = angular.module(routingModuleName);
    });

    test('Модуль зарегистрирован', () => {
        expect(module).not.toEqual(null);
    });
});
