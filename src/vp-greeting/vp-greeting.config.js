import template from './vp-greeting.html';

export const aka = 'vpGreeting';

export const config = {
    template,
    bindings: {
        to: '@',
    },
    scope: {},
    controllerAs: 'vm',
};
