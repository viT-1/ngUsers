import Common from '@/common';

import jsonNaming from './ui-table.naming.json';
import jsonIamCss from './ui-table.iamCss.json';

export const naming = { ...jsonNaming, aka: Common.directiveNormalize(jsonNaming.attr) };

export const config = {
    template: '<ng-transclude></ng-transclude>',
};

// skins определяются подключенным css-файлом.
// Подключаются только те, что в webpack entries подходят по маске
export const iamCssInitMods = jsonIamCss;
