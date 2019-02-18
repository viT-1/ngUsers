import angular from 'angular';
import 'angular-mocks';

import { defaults } from './app.config';
import App from './app';

/* eslint-env jest */

describe(defaults.name, () => {
    beforeEach(() => {
        angular.mock.module(defaults.name);
    });

    test('Если в конструктор не переданы параметры, они берутся из конфига', () => {
        const app = new App();

        expect(app.constructorParams.name).toEqual(defaults.name);
    });
});
