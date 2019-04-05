import angular from 'angular';
import 'angular-mocks';

import Common from '@/common';
import mockHttpModuleName from '@/mock-http';
import Srvc from './vp-greeting.service';

// функция заменяющая таймауты на фэйковые - не требуется ждать
// jest.useFakeTimers();

describe(Srvc.name, () => {
    let svc;
    let $timeout;

    beforeEach(() => {
        angular.mock.module(mockHttpModuleName);
    });

    beforeEach(angular.mock.inject(($injector) => {
        const $http = $injector.get('$http');
        $timeout = $injector.get('$timeout');

        svc = new Srvc($http);
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

        $timeout.flush();
    });
});
