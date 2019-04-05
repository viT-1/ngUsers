import angular from 'angular';
import 'angular-mocks';

import mockHttpModuleName from '@/mock-http';
import moduleName from './pg-users.module';
import Ctrl from './pg-users.controller';

describe(Ctrl.name, () => {
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

    test('При помощи контроллера указывается значение ctrl.users', () => {
        $timeout.flush();

        expect(ctrl.users).toBeDefined();
    });
});
