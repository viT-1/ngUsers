import angular from 'angular';
import 'angular-mocks';

import jsonData from './routing.data.json';
import moduleName from './routing.module';
import Srvc from './routing.service';

describe(`${Srvc.name}`, () => {
    let svc;
    let $state;
    let $rootScope;

    beforeEach(() => {
        angular.mock.module(moduleName);
    });

    beforeEach(angular.mock.inject(($injector) => {
        svc = $injector.get(Srvc.name);
        $state = $injector.get('$state');
        $rootScope = $injector.get('$rootScope');

        if (svc.items) {
            // Инициализируем первое состояние
            $state.go(svc.items[0].key);
            // Необходимо для срабатывания handler'ов на event'ы
            $rootScope.$digest();
        }
    }));

    test('Сервис должен выдавать верное количество items среди которых один isCurrent: true', () => {
        let filtered = [];

        if (svc.items) {
            filtered = svc.items.filter(item => item.isCurrent);
        }

        expect(filtered.length).toBe(1);
    });

    test('Количество mainItems (недочерних состояний) соответствует количеству верхних items jsonData', () => {
        expect(svc.mainItems.length).toBe(jsonData.items.length);
    });

    test('Переход на другой state должен приводить к смене isCurrent в соответствующих ключах', () => {
        expect.assertions(3);
        let stateA = [];
        let stateB = [];

        if (svc.items) {
            stateA = svc.items.filter(item => item.isCurrent);
            expect(stateA.length).toBe(1);

            $state.go(svc.items[1].key);
            $rootScope.$digest();

            stateB = svc.items.filter(item => item.isCurrent);
            expect(stateB.length).toBe(1);

            expect(stateB[0].key).not.toEqual(stateA[0].key);
        }
    });
});

describe(`${Srvc.name} тестирование логики класса`, () => {
    const tree = {
        items: [
            { key: 'itemA', url: '/iA' },
            {
                key: 'itemB',
                url: 'iB',
                items: [
                    { key: 'itemD', url: '/iD' },
                    { key: 'itemE', url: '/iE' },
                ],
            },
            { key: 'itemC', url: '/iC' },
            {
                key: 'itemP',
                url: '/iP',
                items: [
                    { key: 'itemD', url: '/iD' },
                    { key: 'itemE', url: '/iE' },
                ],
            },
        ],
    };

    test('Дерево состояний корректно преобразовывается в плоский список и устанавливает активное состояние', () => {
        expect.assertions(2);

        const rItems = [];
        Srvc.createRoutingItems({
            node: tree,
            activeKey: 'itemC',
            rItems,
        });

        expect(rItems.length).toBe(8);
        expect(rItems.filter(item => item.isCurrent).length).toBe(1);
    });

    test('В createRoutingItems обязательно передавать параметры, иначе будет вызвана ошибка', () => {
        expect(() => { Srvc.createRoutingItems(); }).toThrowError();
    });

    test('В createRoutingItems обязательно передавать node, иначе не будет заполнен массив состояний', () => {
        const rItems = [];
        Srvc.createRoutingItems({});

        expect(rItems.length).toBe(0);
    });

    test('В parsePath обязательно передавать параметры, иначе будет вызвана ошибка', () => {
        expect(() => { Srvc.parsePath(); }).toThrowError();
    });

    test('Цепочка path формируется правильно', () => {
        expect.assertions(2);

        let parsed = Srvc.parsePath({ path: 'state.child.grandchild' });
        expect(parsed).toEqual(['state', 'state.child', 'state.child.grandchild']);

        parsed = Srvc.parsePath({ path: 'url/to/something', delim: '/' });
        expect(parsed).toEqual(['url', 'url/to', 'url/to/something']);
    });

    test('В changeRoutingItemsCurrentFlag обязательно передавать параметры, иначе будет вызвана ошибка', () => {
        expect(() => { Srvc.changeRoutingItemsCurrentFlag(); }).toThrowError();
    });

    test('Работа с дочерней сменой состояний корректна', () => {
        const rItems = [];
        Srvc.createRoutingItems({
            node: tree,
            activeKey: 'itemB.itemD',
            rItems,
        });

        Srvc.changeRoutingItemsCurrentFlag({
            activeKey: 'itemP.itemD',
            prevKey: 'itemB.itemD',
            rItems,
        });

        expect(rItems.filter(item => item.isCurrent).length)
            .toBe(2);
    });
});
