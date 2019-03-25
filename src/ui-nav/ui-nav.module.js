import angular from 'angular';

import UiNavDirective from './ui-nav.directive';
import { naming, requires } from './ui-nav.config';

class UiNav {
    static get module() {
        try {
            return angular.module(this.name);
        } catch (err) {
            return angular.module(this.name, requires)
                // @link: https://github.com/toddmotto/angularjs-styleguide#constants-or-classes
                .directive(naming.aka, () => new UiNavDirective());
        }
    }
}

export default UiNav.module.name;
