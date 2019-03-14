import angular from 'angular';

import UiNavDirective from './ui-nav.directive';
import { naming } from './ui-nav.config';

let module;
try {
    module = angular.module(naming.aka);
} catch (err) {
    module = angular.module(naming.aka, [])
        .directive(naming.aka, () => new UiNavDirective());
}

export default module.name;
