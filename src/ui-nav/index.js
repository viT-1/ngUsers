import angular from 'angular';

import UiNavDirective from './ui-nav.directive';
import { naming, requires } from './ui-nav.config';

let module;
try {
    module = angular.module(naming.aka);
} catch (err) {
    module = angular.module(naming.aka, requires)
        .directive(naming.aka, () => new UiNavDirective());
}

export default module.name;
