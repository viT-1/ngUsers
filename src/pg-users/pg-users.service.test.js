import angular from 'angular';
import 'angular-mocks';

import Common from '@/common';
import mockHttpModuleName from '@/mock-http';

import { errors } from './pg-users.config';
import jsonUsers from './pg-users.data.ru.json';
import Srvc from './pg-users.service';

describe(`${Srvc.name} 1`, () => {
    let $timeout;
    let svc;

    beforeAll(() => {
        angular.module('testApp', [mockHttpModuleName])
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
        const $http = $injector.get('$http');
        $timeout = $injector.get('$timeout');

        svc = new Srvc({ $http });
    }));

    test('getUsers returns promise', () => {
        expect(Common.isPromise(svc.getUsers())).toBe(true);
    });

    test('getUsers возвращает список пользователей', (done) => {
        expect.assertions(4);

        svc.getUsers()
            .then((resp) => {
                expect(resp.data).toBeDefined();
                expect(resp.data.items).toBeDefined();
                expect(resp.data.items.length).toBeGreaterThan(0);
                expect(Object.keys(resp.data.items[0])).toEqual(Object.keys(jsonUsers.users[0]));
                done();
            });

        $timeout.flush();
    });

    test('getGroups возвращает список групп', (done) => {
        expect.assertions(4);

        svc.getGroups()
            .then((resp) => {
                expect(resp.data).toBeDefined();
                expect(resp.data.items).toBeDefined();
                expect(resp.data.items.length).toBeGreaterThan(0);
                expect(Object.keys(resp.data.items[0])).toEqual(Object.keys(jsonUsers.groups[0]));
                done();
            });

        $timeout.flush();
    });

    test('getUserIdsByGroupId возвращает список связей пользователей погруппно', (done) => {
        expect.assertions(3);

        const groupId = 1;

        svc.getUserIdsByGroupId(groupId)
            .then((resp) => {
                expect(resp.data).toBeDefined();
                expect(resp.data.items).toBeDefined();
                expect(resp.data.items.length).toBeGreaterThan(0);
                done();
            });

        $timeout.flush();
    });
});

describe(`${Srvc.name} 2`, () => {
    test('Без передачи $http получаем ошибку', () => {
        expect(() => { new Srvc({ some: 'thing' }); })
            .toThrowError(`${errors.NEED_INJECT} $http`);
    });
});
