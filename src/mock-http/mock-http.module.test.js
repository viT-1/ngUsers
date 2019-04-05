
import angular from 'angular';
import 'angular-mocks';

import moduleName from './mock-http.module';

// Все виды тестирования AngularJS
// @link: https://www.yearofmoo.com/2013/01/full-spectrum-testing-with-angularjs-and-karma.html

describe(moduleName, () => {
    let $timeout;
    let $http;

    beforeEach(() => {
        angular.mock.module(moduleName);
    });

    beforeEach(angular.mock.inject(($injector) => {
        $timeout = $injector.get('$timeout');
        $http = $injector.get('$http');
    }));

    test('Запрос /api/test выдаёт { foo: "bar" }', (done) => {
        expect.assertions(1);

        $http.get('/api/test')
            .then((resp) => {
                expect(resp.data).toMatchObject({ foo: 'bar' });
                done();
            });

        $timeout.flush();
    });
});
