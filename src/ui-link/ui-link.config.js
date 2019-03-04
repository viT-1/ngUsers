// @link: https://toddmotto.com/no-scope-soup-bind-to-controller-angularjs/
// https://toddmotto.com/digging-into-angulars-controller-as-syntax/

export const config = {
    restrict: 'A',
    templateUrl: '/tmpl/ui-link',
    transclude: true,
    // Стандартным образом: через $ctrl, прибиндить значения в шаблон не получится
    controllerAs: 'vm',
    scope: {
        uiLink: '@',
    },
};

// skins определяются подключенным css-файлом.
// Подключаются только те, что в webpack entries подходят по маске
export const iamCssInitMods = {
    // '^': '#app', // context - any parent selector
    v: '1.1', // Styling/layout version
};
