import angular from 'angular';
import 'angular-mocks';

// Логика по инициализации директивы присутствует в точке входа
import {
    naming,
    config,
    errors,
} from './ui-link.config';

// Помимо имени инициализируется модуль, который идёт в angular.mock.module
import ModuleName from '@/ui-link';

describe(`${naming.aka} directiive`, () => {
    let $compile;
    let $rootScope;

    function getElem(srcHtml) {
        const elem = $compile(srcHtml)($rootScope);
        $rootScope.$digest();

        return elem;
    }

    beforeEach(() => {
        angular.module('testApp', [ModuleName]);
        // Не нужен $templateCache, так как вместо templateUrl из базовой директивы указан template
    });

    beforeEach(() => {
        angular.mock.module('testApp');
    });

    beforeEach(angular.mock.inject(($injector) => {
        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
    }));

    // Тест обращающийся к базовому классу (super.link)
    test('Директива отрабатывает - есть html и директива дополнена данными', () => {
        expect.assertions(2);
        const elem = getElem(`<a ${naming.attr}></a>`);

        expect(elem.html()).not.toEqual('');
        expect(elem.attr(naming.attr)).not.toEqual('');
    });

    // Тест соответствует баззовой директиве
    test('Передаваемый html отрисовывается (transclude) директивой как есть', () => {
        expect.assertions(4);

        const elem = getElem(`<a ${naming.attr}><some>Some</some><best>test</best></a>`);
        // jQuery, который в Angular, не работает с атрибутами, только с тэгами
        // @link: https://stackoverflow.com/questions/29414773/how-are-they-using-this-angular-jqlite-find-method-to-select-a-element-by-attr
        const someElem = elem.find('some');
        const testElem = elem.find('best');

        expect(someElem).toBeDefined();
        expect(testElem).toBeDefined();
        expect(someElem.text()).toEqual('Some');
        expect(testElem.text()).toEqual('test');
    });

    // Для сбора стэка ошибок и логирования есть более навороченный инструмент $exceptionHandler
    // @link: http://www.bradoncode.com/blog/2015/06/23/ngmock-fundamentals-testing-exceptions/
    // @link: https://stackoverflow.com/questions/42192977/how-to-capture-compile-or-digest-error-angularjs-directive-with-templateurl
    test('Попытка применить директиву к любому тэгу кроме "a" вызывает ошибку', () => {
        expect(() => { getElem(`<span ${naming.attr}>pseudolink</span>`); })
            .toThrowError(errors.TAG_RESTRICTED);
    });
});
