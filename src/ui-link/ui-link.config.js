// @link: https://toddmotto.com/no-scope-soup-bind-to-controller-angularjs/
// https://toddmotto.com/digging-into-angulars-controller-as-syntax/

export const config = {
    restrict: 'A',
    templateUrl: '/tmpl/ui-link',
    transclude: true,
    scope: {},
    // @link: https://docs.angularjs.org/api/ng/service/$compile#-scope-
    // @link: https://gist.github.com/CMCDragonkai/6282750
    // Чтобы управлять в контроллере this.uiLink
    bindToController: {
        // Предполагается на вход литерал, а не переменная вышестоящего scope
        // но также в контроллере обновляем это значение, потому <, а не @
        uiLink: '<?',
    },
    // Стандартным образом: через $ctrl, прибиндить значения в шаблон директивы не получится
    // такое поведение только у компонент, но мы будем придерживаться тех же правил
    controllerAs: '$ctrl',
};

// skins определяются подключенным css-файлом.
// Подключаются только те, что в webpack entries подходят по маске
export const iamCssInitMods = {
    // '^': '#app', // context - any parent selector
    v: '1.1', // Styling/layout version
};

export const errors = {
    TAG_RESTRICTED: 'uiLink restricted for "a" tag',
};
