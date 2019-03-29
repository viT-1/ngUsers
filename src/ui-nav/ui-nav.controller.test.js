import angular from 'angular';
import 'angular-mocks';

import routingModuleName from '@/routing';
import { aka as routingSrvcName } from '@/routing/routing.service';

import { naming } from './ui-nav.config';
import UiNavDirectiveCtrl from './ui-nav.controller';

describe(`${naming.aka} controller`, () => {
    let ctrl;

    beforeEach(() => {
        angular.module('testApp', [routingModuleName]);
    });

    beforeEach(() => {
        angular.mock.module('testApp');
    });

    beforeEach(angular.mock.inject(($injector) => {
        const $rootScope = $injector.get('$rootScope');
        const $state = $injector.get('$state');
        const svc = $injector.get(routingSrvcName);

        ctrl = new UiNavDirectiveCtrl({
            [routingSrvcName]: svc,
        });

        if (svc.items) {
            // Инициализируем первое состояние
            $state.go(svc.items[0].key);
            // Необходимо для срабатывания handler'ов на event'ы
            $rootScope.$digest();
        }
    }));

    test('Контроллер создержит данные items для отрисовки template', () => {
        ctrl.$onInit();

        expect(ctrl.items).toBeDefined();
    });
});
