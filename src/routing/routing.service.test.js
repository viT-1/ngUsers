import angular from 'angular';
import 'angular-mocks';

// @todo: поменять на свой routing module? с зависимостями от компонент?
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

    test('Сервис должен выдавать items среди которых один isCurrent: true', () => {
        let filtered = [];

        if (svc.items) {
            filtered = svc.items.filter(item => item.isCurrent);
        }

        expect(filtered.length).toBe(1);
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
