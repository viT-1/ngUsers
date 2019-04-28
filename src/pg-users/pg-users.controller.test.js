import angular from 'angular';
import 'angular-mocks';

import { errors as commonErrors } from '@/common/common.config';
import mockHttpModuleName from '@/mock-http';

import { jsonData } from './index';
import moduleName from './pg-users.module';
import Ctrl from './pg-users.controller';

describe(`${Ctrl.name} 1`, () => {
    let $timeout;
    let ctrl;

    beforeAll(() => {
        angular.module('testApp', [moduleName, mockHttpModuleName])
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

        // Таким способом контроллер не взаимодействует с $timeout
        // (не внедрён через inject) по асинхронным действиям
        // ctrl = new Ctrl(new Srvc({ $http }));

        const $componentController = $injector.get('$componentController');
        ctrl = $componentController(moduleName);
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

describe(`${Ctrl.name} 2`, () => {
    test('Без передачи params получаем ошибку', () => {
        expect(() => { new Ctrl(); })
            .toThrowError(commonErrors.NEED_PARAMS);
    });

    test('Без передачи $q и $state получаем ошибку', () => {
        expect(() => { new Ctrl({ PgUsersSrvc: 'thing' }); })
            .toThrowError(`${commonErrors.NEED_INJECT} $q, $state`);
    });

    test('Без передачи PgUsersSrvc и $state получаем ошибку', () => {
        expect(() => { new Ctrl({ $q: 'thing' }); })
            .toThrowError(`${commonErrors.NEED_INJECT} $state, PgUsersSrvc`);
    });

    test('Без передачи $q и PgUsersSrvc получаем ошибку', () => {
        expect(() => { new Ctrl({ $state: 'thing' }); })
            .toThrowError(`${commonErrors.NEED_INJECT} $q, PgUsersSrvc`);
    });
});
