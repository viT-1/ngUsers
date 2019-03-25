import angular from 'angular';

import UiBaseDirective from '@/ui-base-directive';

const naming = { aka: 'fakeTag' };

let module;
try {
    module = angular.module(naming.aka);
} catch (err) {
    module = angular.module(naming.aka, [])
        .directive(naming.aka, () => new UiBaseDirective({
            restrict: 'E',
            naming,
            template: '<ng-transclude></ng-transclude>',
            replace: true,
        }));
}

export default module.name;
