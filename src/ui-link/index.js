import angular from 'angular';

import UiLinkDirective from './ui-link.directive';

let module;
try {
    module = angular.module(UiLinkDirective.aka);
} catch (err) {
    module = angular.module(UiLinkDirective.aka, [])
        .directive(UiLinkDirective.aka, () => new UiLinkDirective());
}

export default module.name;
