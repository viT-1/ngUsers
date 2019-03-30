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
import moduleName from '@/ui-nav';

import tmpl from './ui-nav.html';
import iamCssJson from './ui-nav.iamCss.json';
import DirectiveCtrl from './ui-nav.controller';

import tmplItem from './ui-nav__item.html';
import { config as configItem } from './ui-nav__item.config';

// По данным определяется количество элементов
import { jsonData as navData } from '@/routing';

describe(`${naming.aka} directiive`, () => {
    let $compile;
    let $rootScope;

    function getElem(srcHtml) {
        const elem = $compile(srcHtml)($rootScope);
        $rootScope.$digest();

        return elem;
    }

    beforeEach(() => {
        angular.module('testApp', [moduleName])
            // @link: https://embed.plnkr.co/plunk/pzSMzv
            // @link: https://groups.google.com/forum/#!topic/angular/K-KEWKjiI4Y
            .run(($templateCache) => {
                $templateCache.put(config.templateUrl, tmpl);
                $templateCache.put(configItem.templateUrl, tmplItem);
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

    test('Директива управляется собственным контроллером (не базовым)', () => {
        const elem = getElem(`<div ${naming.attr}></div>`);

        expect(elem.controller(naming.aka) instanceof DirectiveCtrl).toBe(true);
    });

    test('Директива рисует элементы списка с гиперссылками на разделы, соответствующие json', () => {
        expect.assertions(2);
        const elem = getElem(`<nav ${naming.attr}></nav>`);
        const queryItems = `[${naming.attr}${naming.attrItem}][href ^= "#!/"]`;
        const items = elem[0].querySelectorAll(queryItems);

        expect(items.length).toBe(navData.items.length);
        expect(items[0].innerHTML).toBe(navData.items[0].title);
    });

    test('Если в директиву ui-nav передать модификатор отличный от config,'
        + ' то и в ui-nav__item будет использоваться тот же', () => {
        const elem = getElem(`<nav ${naming.attr}='{"dir":"555"}'></nav>`);
        const queryItems = `[${naming.attr}${naming.attrItem} *= '"dir":"555"']`;
        const items = elem[0].querySelectorAll(queryItems);

        expect(items.length).toBeGreaterThan(0);
    });
});
