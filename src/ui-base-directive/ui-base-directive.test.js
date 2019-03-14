import angular from 'angular';
import 'angular-mocks';

import { errors as commonErrors } from '@/common/common.config';
import { errors } from './ui-base-directive.config';

// Помимо имени инициализируется модуль, который идёт в angular.mock.module
import UiBaseDirective from './ui-base-directive';

const naming = { attr: 'base-dir', aka: 'baseDir' };
const iamCssInitMods = { v: 'v1-0' };

describe(`${naming.aka} directiive`, () => {
    let $compile;
    let $rootScope;

    function getElem(srcHtml) {
        const elem = $compile(srcHtml)($rootScope);
        $rootScope.$digest();

        return elem;
    }

    beforeEach(() => {
        angular.module('testApp', [])
            .directive(naming.aka, () => new UiBaseDirective({ naming, iamCss: iamCssInitMods }));
    });

    beforeEach(() => {
        angular.mock.module('testApp');
    });

    beforeEach(angular.mock.inject(($injector) => {
        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
    }));

    test('Попытка создать директиву без параметров вызывает ошибку', () => {
        expect(() => { new UiBaseDirective(); })
            .toThrowError(commonErrors.NEED_PARAMS);
    });

    test('Попытка создать директиву без параметра naming вызывает ошибку', () => {
        expect(() => { new UiBaseDirective({ some: 'thing' }); })
            .toThrowError(errors.NEED_NAMING);
    });

    test('Директива отрабатывает - есть html', () => {
        const elem = getElem(`<a ${naming.attr}></a>`);

        expect(elem.html()).not.toEqual('');
    });

    // @link: https://stackoverflow.com/a/24761145
    test(`Контроллер определён и содержит свойство ${naming.attr}`, () => {
        expect.assertions(2);

        const elem = getElem(`<a ${naming.attr}></a>`);
        const vm = elem.controller(naming.aka);

        expect(vm).toBeDefined();
        expect(vm[naming.aka]).toBeDefined();
    });

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

    test('Атрибут директивы по умолчанию должен быть дополнен информацией о версии директивы', () => {
        const elem = getElem(`<a ${naming.attr}></a>`);

        expect(elem.attr(naming.attr)).toBe(JSON.stringify(iamCssInitMods));
    });

    test('Если в директиву передаётся информации о версии, она не должна перезатираться установками', () => {
        const version = 'v0-99';
        const inputMods = { v: version };

        const elem = getElem(`<a ${naming.attr}='${JSON.stringify(inputMods)}'></a>`);
        // console.log(elem[0].outerHTML);
        expect(elem.attr(naming.attr)).toContain(version);
    });
});
