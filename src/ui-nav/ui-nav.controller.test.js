import angular from 'angular';
import 'angular-mocks';

import { errors as commonErrors } from '@/common/common.config';
import routingModuleName from '@/routing';
import { aka as routingSrvcName } from '@/routing/routing.service';

import { naming } from './ui-nav.config';
import Ctrl from './ui-nav.controller';

describe(`${naming.aka} controller`, () => {
    let ctrl;

    beforeAll(() => {
        angular.module('testApp', [routingModuleName])
            .config($provide => $provide.decorator(
                '$httpBackend', angular.mock.e2e.$httpBackendDecorator,
            ));
    });

    beforeEach(() => {
        angular.mock.module('testApp');
    });

    beforeEach(angular.mock.inject(($injector) => {
        const $rootScope = $injector.get('$rootScope');
        const $state = $injector.get('$state');
        const svc = $injector.get(routingSrvcName);

        ctrl = new Ctrl({
            [routingSrvcName]: svc,
        });

        if (svc.items) {
            // Инициализируем первое состояние
            $state.go(svc.items[0].key);
            // Необходимо для срабатывания handler'ов на event'ы
            $rootScope.$digest();
        }
    }));

    test('Попытка создать контроллера без параметров вызывает ошибку', () => {
        expect(() => { new Ctrl(); })
            .toThrowError(commonErrors.NEED_PARAMS);
    });

    test('Контроллер создержит данные items для отрисовки template', () => {
        ctrl.$onInit();

        expect(ctrl.items).toBeDefined();
    });
});
