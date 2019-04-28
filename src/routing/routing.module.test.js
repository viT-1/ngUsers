import angular from 'angular';
import 'angular-mocks';

import moduleName from './routing.module';

describe(moduleName, () => {
    let module;

    beforeAll(() => {
        angular.module('testApp', [moduleName]);
        // Не нужен $templateCache, так как вместо templateUrl из базовой директивы указан template
    });

    beforeEach(() => {
        angular.mock.module('testApp');
        module = angular.module(moduleName);
    });

    test('Модуль зарегистрирован', () => {
        expect(module).not.toEqual(null);
    });
});
