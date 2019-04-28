import angular from 'angular';
import 'angular-mocks';

import moduleName from './routing.module';

describe(moduleName, () => {
    let module;

    beforeEach(() => {
        angular.mock.module(moduleName);
        module = angular.module(moduleName);
    });

    test('Модуль зарегистрирован', () => {
        expect(module).not.toEqual(null);
    });
});
