import angular from 'angular';
import 'angular-mocks';

// Логика по инициализации директивы присутствует в точке входа
import {
    naming,
    config, // В тестах нужен только для мокирования templateUrl
    iamCssInitMods,
} from './ui-nav.config';

// Помимо имени инициализируется модуль, который идёт в angular.mock.module
// В принципе можно задать модуль с другими изначальными настройками.
// Например указать горизонтальное расположение по умолчанию (не в html)
// тогда надо импортировать не имя зависимости, а сам класс директивы
import ModuleName from '@/ui-nav';
import tmpl from './ui-nav.html';
import iamCssJson from './ui-nav.iamCss.json';

describe(`${naming.aka} directiive`, () => {
    let $compile;
    let $rootScope;

    function getElem(srcHtml) {
        const elem = $compile(srcHtml)($rootScope);
        $rootScope.$digest();

        return elem;
    }

    beforeEach(() => {
        const app = angular.module('testApp', [ModuleName]);

        // @link: https://embed.plnkr.co/plunk/pzSMzv
        // @link: https://groups.google.com/forum/#!topic/angular/K-KEWKjiI4Y
        app.run(($templateCache) => {
            $templateCache.put(config.templateUrl, tmpl);
        });
    });

    beforeEach(() => {
        angular.mock.module('testApp');
    });

    beforeEach(angular.mock.inject(($injector) => {
        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
    }));

    test('Директива отрабатывает - есть html и директива дополнена данными', () => {
        expect.assertions(2);
        const elem = getElem(`<nav ${naming.attr}></nav>`);

        expect(elem.html()).not.toEqual('');
        expect(elem.attr(naming.attr)).not.toEqual('');
    });

    test('В слинкованном значении директивы должны быть только переданнее в HTML свойства и iamCss', () => {
        expect.assertions(2);
        const customAttrJson = { some: 'thing', no: 'thing' };
        const strAttrValue = JSON.stringify(customAttrJson);
        const elem = getElem(`<nav ${naming.attr}='${strAttrValue}'></nav>`);

        // Опираемся на то, что в тесте в конструктор директивы не переданы параметры
        const attrValue = elem.attr(naming.attr);
        expect(attrValue).toBeDefined();

        const attrJsonExpected = { ...iamCssInitMods, ...customAttrJson };
        expect(JSON.parse(attrValue)).toEqual(attrJsonExpected);
    });

    // Аналог теста на версию в UiBaseDirective
    // @todo: Протестировать передачу iamCss json'ом напрямую в контроллер (работа через '<?')
    test('Указание iamCss параметров (горизонтальное расположение) в атрибуте не перезатирается директивой', () => {
        const elem = getElem(`<span ${naming.attr}='{"dir":"${iamCssJson.dirHoriz}"}'></span>`);

        expect(JSON.parse(elem.attr(naming.attr))).toHaveProperty('dir', iamCssJson.dirHoriz);
    });

    test('Директива к любому тэгу кроме nav, дополняет DOM-элемент role="navigation"', () => {
        const elem = getElem(`<div ${naming.attr}></div>`);

        expect(elem.attr('role')).toBe('navigation');
    });

    test('Директива к nav, не дополняет DOM-элемент role="navigation"', () => {
        const elem = getElem(`<nav ${naming.attr}></nav>`);

        expect(elem.attr('role')).toBeUndefined();
    });
});
