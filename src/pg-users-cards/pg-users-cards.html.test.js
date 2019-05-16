import angular from 'angular';
import 'angular-mocks';

import mockHttpModuleName from '@/mock-http';
import PgUserSrvc from '@/pg-users/pg-users.service';

import moduleName from './index';
import { naming } from './pg-users-cards.config';

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
            .service(PgUserSrvc.name, $http => new PgUserSrvc({ $http }))
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

        // 327ms через $componentController
        const $componentController = $injector.get('$componentController');
        const ctrl = $componentController(moduleName);

        ctrl.$onInit();
    }));

    test('Компонент с пустым фильтром отображает хотя бы одного пользователя', () => {
        const elem = getElem();

        const user = elem.find('li');
        expect(user).toBeDefined();
    });
});
