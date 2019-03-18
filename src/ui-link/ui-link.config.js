// @link: https://toddmotto.com/no-scope-soup-bind-to-controller-angularjs/
// https://toddmotto.com/digging-into-angulars-controller-as-syntax/

import jsonNaming from './ui-link.naming.json';

export const naming = jsonNaming;

export const config = {
    template: '<ng-transclude></ng-transclude>',
};

// skins определяются подключенным css-файлом.
// Подключаются только те, что в webpack entries подходят по маске
export const iamCssInitMods = {
    // '^': '#app', // context - any parent selector
    v: 'v1-1', // Styling/layout version
};

export const errors = {
    TAG_RESTRICTED: 'uiLink restricted for "a" tag',
};
