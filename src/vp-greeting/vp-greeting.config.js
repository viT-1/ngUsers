import template from './vp-greeting.html';
import controller from './vp-greeting__controller';

const config = {
    name: 'vpGreeting',
    template,
    bindings: {
        to: '@',
    },
    scope: {},
    controller,
    controllerAs: 'vm',
};

export default config;
