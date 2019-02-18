import template from './vp-greeting.html';
import controller from './vp-greeting__controller';

export const defaults = {
    name: 'vpGreeting',
};

export const config = {
    template,
    bindings: {
        to: '@',
    },
    scope: {},
    controller,
    controllerAs: 'vm',
};
