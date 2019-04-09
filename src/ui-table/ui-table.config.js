import Common from '@/common';

import jsonNaming from './ui-table.naming.json';
import jsonIamCss from './ui-table.iamCss.json';

let {
    attr,
    attrTh,
    attrTd,
} = jsonNaming;

attrTh = `${attr}${attrTh}`;
attrTd = `${attr}${attrTd}`;

export const naming = {
    attr,
    aka: Common.directiveNormalize(attr),
    attrTh,
    akaTh: Common.directiveNormalize(attrTh),
    attrTd,
    akaTd: Common.directiveNormalize(attrTd),
};

export const config = {
    template: '<ng-transclude></ng-transclude>',
};

// skins определяются подключенным css-файлом.
// Подключаются только те, что в webpack entries подходят по маске
export const iamCssInitMods = jsonIamCss;
