import template from './vp-greeting.html';

// @todo: в зависимости добавить uiRouter
export const requirements = [];

export const name = 'vpGreeting';

export const config = {
    template,
    bindings: {
        to: '@',
    },
    scope: {},
    controllerAs: 'vm',
};
