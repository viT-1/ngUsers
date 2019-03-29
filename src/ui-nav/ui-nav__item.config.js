import Common from '@/common';

import jsonNaming from './ui-nav.naming.json';
// import template from './ui-nav__item.html';

const attr = `${jsonNaming.attr}${jsonNaming.attrItem}`;

export const naming = {
    attr,
    aka: Common.directiveNormalize(attr),
};

export const config = {
    templateUrl: '/tmpl/ui-nav/item',
    bindings: {
        data: '<',
    },
    scope: {},
};
