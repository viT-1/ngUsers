import angular from 'angular';
import 'angular-mocks';

import { errors as commonErrors } from '@/common/common.config';
import mockHttpModuleName from '@/mock-http';

import { jsonData } from '@/pg-users';
import PgUsersSrvc from '@/pg-users/pg-users.service';

import moduleName from './index';
import Ctrl from './pg-users-table.controller';

describe(`${Ctrl.name} with $injector`, () => {
    let $timeout;
    let ctrl;

    beforeAll(() => {
        angular.module('testApp', [mockHttpModuleName, moduleName])
            // возвращаем httpBackendDecorator к исходной логике
            // без задержки по времени настраиваиваемой для основного приложения через config
            .config($provide => $provide.decorator(
                '$httpBackend', angular.mock.e2e.$httpBackendDecorator,
            ));
    });

    beforeEach(() => {
        angular.mock.module('testApp');
    });

    beforeEach(angular.mock.inject(($injector) => {
        $timeout = $injector.get('$timeout');
        const $http = $injector.get('$http');
        const $q = $injector.get('$q');

        ctrl = new Ctrl({
            PgUsersSrvc: new PgUsersSrvc({ $http }),
            $q,
        });

        ctrl.$onInit();
    }));

    test('При помощи контроллера указывается значение ctrl.groups в котором как минимум то же количество групп, что и в json', () => {
        expect.assertions(2);
        $timeout.flush();

        // Насколько это корректно опираться на то, что асинхронный запрос
        // будет отрабатывать без задержки с помощью httpBackendDecorator?
        expect(ctrl.groups).toBeDefined();
        expect(ctrl.groups.length).toBeGreaterThanOrEqual(
            jsonData.groups.filter(g => g.type === 1).length,
        );
    });
});

describe(`${Ctrl.name} as class`, () => {
    test('Без передачи params получаем ошибку', () => {
        expect(() => { new Ctrl(); })
            .toThrowError(commonErrors.NEED_PARAMS);
    });

    test('Без передачи PgUsersSrvc получаем ошибку', () => {
        expect(() => { new Ctrl({ $state: 'thing' }); })
            .toThrowError(`${commonErrors.NEED_INJECT} $q, PgUsersSrvc`);
    });
});
