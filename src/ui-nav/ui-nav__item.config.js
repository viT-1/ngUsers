import Common from '@/common';

import jsonNaming from './ui-nav.naming.json';

const attr = `${jsonNaming.attr}${jsonNaming.attrItem}`;

export const naming = {
    attr,
    aka: Common.directiveNormalize(attr),
};

export const config = {
    templateUrl: '/tmpl/ui-nav/item',
    bindings: {
        data: '<', // Данные из сервиса для отображения элемента
        mods: '<', // iamCss модификаторы из родительского ui-nav
    },
    scope: {},
};
