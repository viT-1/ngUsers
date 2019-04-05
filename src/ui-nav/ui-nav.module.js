import angular from 'angular';

import Drct from './ui-nav.directive';
import { naming, requires } from './ui-nav.config';

import ItemCtrl from './ui-nav__item.controller';
import { naming as itemNaming, config as itemConfig } from './ui-nav__item.config';

class UiNav {
    static get module() {
        try {
            return angular.module(this.name);
        } catch (err) {
            return angular.module(this.name, requires)
                // @link: https://github.com/toddmotto/angularjs-styleguide#constants-or-classes
                .directive(naming.aka, () => new Drct())
                .component(itemNaming.aka, { ...itemConfig, controller: ItemCtrl });
        }
    }
}

export default UiNav.module.name;
