import vpGreetingModuleName from '@/vp-greeting';
import mockHttpModuleName from '@/mock-http';
import uiAppModuleName from '@/ui-app';
import uiLinkModuleName from '@/ui-link';
import uiNavModuleName from '@/ui-nav';

export const aka = 'vpApp';

export const defaults = {
    name: aka,
    selector: 'body',
    // Не забываем для сборки CSS добавлять соответствующие ключи в ~/config.js cssFilter
    // @todo: надо это как-то объединить с ~/config.js, с учётом src/{folder}/{folder}.naming.json
    requires: [
        vpGreetingModuleName,
        mockHttpModuleName,
        uiAppModuleName,
        uiLinkModuleName,
        uiNavModuleName,
    ],
};
