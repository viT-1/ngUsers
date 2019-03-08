import angular from 'angular';
import 'angular-mocks';

import tmplSome from './some.html';
import UiLinkCtrl from './ui-link.controller';

// https://www.sitepoint.com/angular-testing-tips-testing-directives/
describe('Directive with span', () => {
    let $compile;
    let $scope;
    const errMsg = 'Sheep happens!';

    // Сначала инициализируем реальную директиву
    beforeEach(() => {
        const app = angular.module('testFirstDirectiveApp', []);

        // https://groups.google.com/forum/#!topic/angular/K-KEWKjiI4Y
        app.run(($templateCache) => {
            // console.log('tmplSome', tmplSome);
            $templateCache.put('/tmpl/some', tmplSome);
        });

        app.directive('firstDirective', () => ({
            restrict: 'A',
            templateUrl: '/tmpl/some',
            // template: '<span>This span is rendered by template.</span>',
            link: ((scope, el) => {
                el.append('<span>This span 2 is appended from directive.</span>');
                if (el[0].tagName === 'H2') {
                    throw new Error(errMsg);
                }
            }),
            controller: UiLinkCtrl,
        }));
    });

    // Вторым шагом мокируем реальное в окружение angular-mocks (вместо angular.bootstrap)
    beforeEach(angular.mock.module('testFirstDirectiveApp'));

    // Из angular-mocks Теперь вытаскиваем нужные функции
    beforeEach(angular.mock.inject(($injector) => {
        $compile = $injector.get('$compile');
        $scope = $injector.get('$rootScope').$new();

        // const $templateCache = $injector.get('$templateCache');
        // $templateCache.put('/tmpl/some', tmplSome);

        // Так сработает только если контроллер цеплять к модулю
        // $controller = $injector.get('$controller');
    }));

    it('should have span element', () => {
        expect.assertions(3);

        const elem = $compile('<h1 first-directive></h1>')($scope);
        $scope.$digest();
        // jqLite
        const spanElement = elem.children('span'); // find - по всей шлубине дерева, children - ближайшие

        console.log('elem.html 1', elem.html());
        // console.log(spanElement.eq(1).html());

        expect(spanElement).toBeDefined();
        expect(spanElement.length).toEqual(2);
        expect(spanElement.eq(1).text()).toEqual('This span 2 is appended from directive.');
    });

    it('should applied template', () => {
        const elem = $compile('<h1 first-directive></h1>')($scope);
        // Первый тест проходит без apply, всем остальным он необходим
        $scope.$apply();

        console.log('elem.html 2', elem.html());

        expect(elem.html()).not.toEqual('');
    });

    it('should be compile error', () => {
        // expect(() => { $compile('<h2 first-directive></h2>')($scope); })
        //     .toThrowError(errMsg);

        $compile('<h2 first-directive></h2>')($scope);
        expect(() => { $scope.$apply(); })
            .toThrowError(errMsg);
    });

    it('controller should have property "check"', () => {
        expect.assertions(2);

        // https://stackoverflow.com/a/24761145
        // const vm = $controller('firstDirective', { $scope });

        const elem = $compile('<h3 first-directive></h3>')($scope);
        // Первый тест проходит без apply, всем остальным он необходим
        $scope.$apply();
        const vm = elem.controller('firstDirective');

        expect(vm).toBeDefined();
        expect(vm.check).toEqual('Проверка');
    });

    it('should not be an element (directive is not rendered)', () => {
        expect.assertions(2);

        const elem = $compile('<first-directive></first-directive>')($scope);
        // Первый тест проходит без apply, всем остальным он необходим
        $scope.$apply();
        const vm = elem.controller('firstDirective');

        expect(vm).not.toBeDefined();
        expect(elem.html()).toEqual('');
    });
});
