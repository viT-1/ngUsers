import angular from 'angular';

import UiBaseDirective from '@/ui-base-directive';
import { config, naming, iamCssInitMods as iamCss } from './ui-table.config';

let module;
try {
    module = angular.module(naming.aka);
} catch (err) {
    module = angular.module(naming.aka, [])
        .directive(naming.aka, () => new UiBaseDirective({
            ...config,
            naming,
            // в атрибут директивы попадает только свойство iamCss
            iamCss,
        }));
}

export default module.name;
