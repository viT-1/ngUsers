import vpGreetingModuleName from '@/vp-greeting';
import mockHttpModuleName from '@/mock-http';

export const aka = 'vpApp';

export const defaults = {
    name: aka,
    selector: 'body',
    requirements: [
        vpGreetingModuleName,
        mockHttpModuleName,
    ],
};
