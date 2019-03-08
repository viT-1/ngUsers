import angular from 'angular';
import 'angular-mocks';

import uiLinkModuleName from './ui-link.module';
import { cl } from './ui-link.module';
import tmplUiLink from './ui-link.html';
import { config, iamCssInitMods, errors } from './ui-link.config';

// @link: https://www.sitepoint.com/angular-testing-tips-testing-directives/
// @link: https://davidtang.io/2015/09/01/unit-testing-directives-part-2.html
describe(uiLinkModuleName, () => {
    let $compile;
    let $scope;

    function getElem(srcHtml) {
        const elem = $compile(srcHtml)($scope);
        $scope.$digest();

        return elem;
    }

    beforeEach(() => {
        const app = cl.module;

        // @link: https://embed.plnkr.co/plunk/pzSMzv
        // @link: https://groups.google.com/forum/#!topic/angular/K-KEWKjiI4Y
        app.run(($templateCache) => {
            $templateCache.put(config.templateUrl, tmplUiLink);
        });
    });

    beforeEach(angular.mock.module(cl.aka));

    beforeEach(angular.mock.inject(($injector) => {
        $compile = $injector.get('$compile');
        $scope = $injector.get('$rootScope').$new();
    }));

    test('Директива отрабатывает - есть html', () => {
        const elem = getElem('<a ui-link></a>');

        expect(elem.html()).not.toEqual('');
    });

    // Для сбора стэка ошибок и логирования есть более навороченный инструмент $exceptionHandler
    // @link: http://www.bradoncode.com/blog/2015/06/23/ngmock-fundamentals-testing-exceptions/
    // @link: https://stackoverflow.com/questions/42192977/how-to-capture-compile-or-digest-error-angularjs-directive-with-templateurl
    test('Попытка применить директиву к любому тэгу кроме "a" вызывает ошибку', () => {
        expect(() => { getElem('<span ui-link>pseudolink</span>'); })
            .toThrowError(errors.TAG_RESTRICTED);
    });

    // @link: https://stackoverflow.com/a/24761145
    test('Контроллер определён и содержит свойство uiLink', () => {
        expect.assertions(2);

        const elem = getElem('<a ui-link></a>');
        const vm = elem.controller('uiLink');

        expect(vm).toBeDefined();
        expect(vm.uiLink).toBeDefined();
    });

    test('Передаваемый html отрисовывается (transclude) директивой как есть', () => {
        expect.assertions(4);

        const elem = getElem('<a ui-link="cvftest"><some>Some</some><best>test</best></a>');
        // jQuery, который в Angular, не работает с атрибутами, только с тэгами
        // @link: https://stackoverflow.com/questions/29414773/how-are-they-using-this-angular-jqlite-find-method-to-select-a-element-by-attr
        const someElem = elem.find('some');
        const testElem = elem.find('best');

        expect(someElem).toBeDefined();
        expect(testElem).toBeDefined();
        expect(someElem.text()).toEqual('Some');
        expect(testElem.text()).toEqual('test');
    });

    test('Атрибут директивы по умолчанию должен быть дополнен информацией о версии директивы', () => {
        const elem = getElem('<a ui-link></a>');

        expect(elem.attr('ui-link')).toBe(JSON.stringify(iamCssInitMods));
    });

    test('Если в директиву передаётся информации о версии, она не должна перезатираться установками', () => {
        const version = '0.99';
        const inputMods = { v: version };

        const elem = getElem(`<a ui-link='${JSON.stringify(inputMods)}'></a>`);
        // console.log(elem[0].outerHTML);
        expect(elem.attr('ui-link')).toContain(version);
    });
});
