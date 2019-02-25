import App from '@/app';
import mockHttpModuleName from '@/mock-http';

(() => {
    new App({
        name: 'mockHttpApp',
        requirements: [mockHttpModuleName],
    });
})();
