import angular from 'angular';
import 'angular-mocks';

import { errors as commonErrors } from '@/common/common.config';
import mockHttpModuleName from '@/mock-http';

import moduleName from './pg-users.module';
import Ctrl from './pg-users.controller';
import { initValues } from './pg-users.config';

describe(`${Ctrl.name} by mock`, () => {
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
        // Таким способом контроллер не взаимодействует с $timeout
        // (не внедрён через inject) по асинхронным действиям
        // ctrl = new Ctrl(new Srvc({ $http }));

        const $componentController = $injector.get('$componentController');
        ctrl = $componentController(moduleName);
    }));

    test('По умолчанию выставляется тот режим отображения, что указан в config', () => {
        expect.assertions(2);

        // Насколько это корректно опираться на то, что асинхронный запрос
        // будет отрабатывать без задержки с помощью httpBackendDecorator?
        expect(ctrl.viewType).toBeDefined();
        expect(ctrl.viewType).toBe(initValues.viewType);
    });
});

describe(`${Ctrl.name} as class`, () => {
    test('Без передачи params получаем ошибку', () => {
        expect(() => { new Ctrl(); })
            .toThrowError(commonErrors.NEED_PARAMS);
    });

    test('Без передачи $state получаем ошибку', () => {
        expect(() => { new Ctrl({ some: 'thing' }); })
            .toThrowError(`${commonErrors.NEED_INJECT} $state`);
    });
});
