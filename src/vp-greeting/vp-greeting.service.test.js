import angular from 'angular';
import 'angular-mocks';

import Common from '@/common';
import VpGreetingService from './vp-greeting.service';

// функция заменяющая таймауты на фэйковые - не требуется ждать
jest.useFakeTimers();

describe(VpGreetingService.aka, () => {
    let svc;
    let $rootScope;

    beforeEach(angular.mock.inject(($injector) => {
        const $http = $injector.get('$http');
        const $q = $injector.get('$q');
        $rootScope = $injector.get('$rootScope');

        svc = new VpGreetingService($http, $q);
    }));

    test('Сервис по getGreetString выдаёт обещание', () => {
        expect(Common.isPromise(svc.getGreetString())).toBe(true);
    });

    test('Если с источником данных всё в порядке, то getGreetString выдаёт data.greet', (done) => {
        expect.assertions(2);

        svc.getGreetString()
            .then((resp) => {
                expect(resp.data).toBeDefined();
                expect(resp.data.greet).toBeDefined();
                done();
            });

        // Фэйковые таймауты выполнить
        jest.runAllTimers();

        // Заставляем $q ожить
        $rootScope.$apply();
    });

    test('Если источник прислал ошибку, то data.greet отсутствует', (done) => {
        expect.assertions(2);

        svc.getGreetString('падаем! 8P')
            .catch((resp) => {
                expect(resp.data).toBeDefined();
                expect(resp.data.greet).not.toBeDefined();
                done();
            });

        // Заставляем $q ожить
        $rootScope.$apply();
    });
});
