import vpGreetingModuleName from '@/vp-greeting';
import mockHttpModuleName from '@/mock-http';
import uiLinkModuleName from '@/ui-link';

export const aka = 'vpApp';

export const defaults = {
    name: aka,
    selector: 'body',
    requirements: [
        vpGreetingModuleName,
        mockHttpModuleName,
        uiLinkModuleName,
    ],
};

export const config = {
    templateUrl: '/tmpl/app',
    bindings: {},
    scope: {},
};
