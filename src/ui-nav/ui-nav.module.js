import angular from 'angular';

import Drct from './ui-nav.directive';
import { naming, requires } from './ui-nav.config';
import dataRu from './ui-nav.translate.ru.json';

import ItemCtrl from './ui-nav__item.controller';
import { naming as itemNaming, config as itemConfig } from './ui-nav__item.config';

class UiNav {
    static run(gettextCatalog) {
        gettextCatalog.setStrings('ru', dataRu);
    }

    static get module() {
        try {
            return angular.module(this.name);
        } catch (err) {
            return angular.module(this.name, requires)
                // @link: https://github.com/toddmotto/angularjs-styleguide#constants-or-classes
                .run(UiNav.run)
                .directive(naming.aka, () => new Drct())
                .component(itemNaming.aka, {
                    ...itemConfig,
                    controller: gettextCatalog => new ItemCtrl({ gettextCatalog }),
                });
        }
    }
}

export default UiNav.module.name;
