import angular from 'angular';

import UiBaseDirective from '@/ui-base-directive';
import template from './ui-app.html';
import jsonNaming from './ui-app.naming.json';

const naming = jsonNaming;

let module;
try {
    module = angular.module(naming.aka);
} catch (err) {
    module = angular.module(naming.aka, [])
        .directive(naming.aka, () => new UiBaseDirective({
            naming,
            template,
            // в атрибут директивы попадает только свойство iamCss
            iamCss: { version: 'grid' },
        }));
}

export default module.name;
