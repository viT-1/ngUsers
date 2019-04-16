import angular from 'angular';
import 'angular-mocks';

import mockHttpModuleName from '@/mock-http';

import { jsonData } from './index';
// Включаем всё сразу - и контроллер компонента и сервис и компонент
import moduleName from './pg-users.module';
import { config, naming } from './pg-users.config';

describe(`${naming.aka} component`, () => {
    let $compile;
    let $rootScope;
    let $timeout;

    function getElem() {
        const scope = $rootScope.$new();
        const elem = $compile(`<${naming.attr}></${naming.attr}>`)(scope);
        scope.$apply();
        $timeout.flush();

        return elem;
    }

    beforeAll(() => {
        angular.module('testApp', [mockHttpModuleName, moduleName])
            .config($provide => $provide.decorator(
                // Возвращаем исходный декоратор без задержки
                '$httpBackend', angular.mock.e2e.$httpBackendDecorator,
            ));
    });

    beforeEach(() => {
        angular.mock.module('testApp');
    });

    beforeEach(angular.mock.inject(($injector) => {
        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
        $timeout = $injector.get('$timeout');

        const $componentController = $injector.get('$componentController');
        const ctrl = $componentController(moduleName);
        ctrl.$onInit();
    }));

    test('Компонент рендерит столько tbody, сколько групп + 1 (без группы)', () => {
        const elem = getElem();

        expect(elem[0].querySelectorAll(`[${naming.attr}__table] tbody`).length)
            .toBeGreaterThanOrEqual(
                jsonData.groups.filter(g => g.type === 1).length,
            );
    });
});
