import angular from 'angular';
import 'angular-mocks';

import { jsonData } from '@/routing';

import tmpl from './ui-nav__item.html';
import ItemCtrl from './ui-nav__item.controller';
import { naming, config } from './ui-nav__item.config';

// @link: https://stackoverflow.com/questions/48101798/how-to-test-changes-on-component-bindings-by-parent-element
describe(`${naming.aka} component`, () => {
    let $compile;
    let $rootScope;

    function getElem(data) {
        const scope = $rootScope.$new();
        const elem = $compile(`<${naming.attr} data="testData"></${naming.attr}>`)(scope);
        scope.testData = data;
        scope.$apply();

        return elem;
    }

    beforeAll(() => {
        angular.module('testApp', [])
            .component(naming.aka, { ...config, controller: ItemCtrl })
            .config($provide => $provide.decorator(
                '$httpBackend', angular.mock.e2e.$httpBackendDecorator,
            ))
            .run(($templateCache) => {
                $templateCache.put(config.templateUrl, tmpl);
            });
    });

    beforeEach(() => {
        angular.mock.module('testApp');
    });

    beforeEach(angular.mock.inject(($injector) => {
        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
    }));

    test('Компонент рендерит в атрибуте "isCurrent":false если !data.isCurrent', () => {
        const elem = getElem({ ...jsonData.items[0], isCurrent: false });

        expect(elem[0].querySelectorAll(`[${naming.attr} *= '"isCurrent":false']`).length).toBe(1);
    });

    test('Компонент рендерит в атрибуте "isCurrent":true если data.isCurrent', () => {
        const elem = getElem({ ...jsonData.items[1], isCurrent: true });

        expect(elem[0].querySelectorAll(`[${naming.attr} *= '"isCurrent":true']`).length).toBe(1);
    });
});
