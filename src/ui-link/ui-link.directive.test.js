import angular from 'angular';
import 'angular-mocks';

// Логика по инициализации директивы присутствует в точке входа
import {
    naming,
    config,
    errors,
} from './ui-link.config';

// Помимо имени инициализируется модуль, который идёт в angular.mock.module
import UiLinkModuleName from '@/ui-link';
import tmplUiLink from './ui-link.html';

describe(`${naming.aka} directiive`, () => {
    let $compile;
    let $rootScope;

    function getElem(srcHtml) {
        const elem = $compile(srcHtml)($rootScope);
        $rootScope.$digest();

        return elem;
    }

    beforeEach(() => {
        const app = angular.module('testApp', [UiLinkModuleName]);

        // @link: https://embed.plnkr.co/plunk/pzSMzv
        // @link: https://groups.google.com/forum/#!topic/angular/K-KEWKjiI4Y
        app.run(($templateCache) => {
            $templateCache.put(config.templateUrl, tmplUiLink);
        });
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

    // Для сбора стэка ошибок и логирования есть более навороченный инструмент $exceptionHandler
    // @link: http://www.bradoncode.com/blog/2015/06/23/ngmock-fundamentals-testing-exceptions/
    // @link: https://stackoverflow.com/questions/42192977/how-to-capture-compile-or-digest-error-angularjs-directive-with-templateurl
    test('Попытка применить директиву к любому тэгу кроме "a" вызывает ошибку', () => {
        expect(() => { getElem(`<span ${naming.attr}>pseudolink</span>`); })
            .toThrowError(errors.TAG_RESTRICTED);
    });
});
