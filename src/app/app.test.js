import angular from 'angular';
import 'angular-mocks';

import { aka, defaults } from './app.config';
import App from './app';

// @link https://www.thecodecampus.de/blog/avoid-memory-leaks-angularjs-unit-tests/

describe(aka, () => {
    // @todo: afterEach сделать тесты атомарными - чтобы нельзя было из теста в тест
    // получать модуль приложения, созданный в одном из предыдущих тестов app.destroy

    test('Если в конструктор не переданы параметры, они берутся из конфига', () => {
        const app = new App();

        expect(app.constructorParams).toEqual(defaults);
    });

    test('Модуль приложения инициирован указанным в параметрах именем', () => {
        const appName = 'MyAngularApp';

        new App({ name: appName });
        expect(angular.module(appName)).toBeTruthy();
    });

    // @todo: разобраться со строкой 16 в app.js angular.bootstrap
    xtest('Указанный селектор bootstrapped', (done) => {
        const selector = '#app';
        angular.element(document).ready(() => {
            const isInitialized = false;

            expect(isInitialized).toBeTruthy();
            // console.log(document.querySelector(selector));
            done();
        });

        // @todo: атомарные тесты
        // expect(angular.module('MyAngularApp')).toBeFalsy();
    });
});
