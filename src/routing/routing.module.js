import angular from 'angular';

import Common from '@/common';

import data from './routing.data.json';
import Srvc from './routing.service';
import { requires } from './routing.config';

// Тесты!
// @link: https://medium.com/evbinary/angularjs-and-ui-router-testing-the-right-way-part-1-c165c4565549

class Routing {
    /* @ngInject */
    static setStates($stateProvider) {
        // console.log('222');
        // @todo: рекурсию
        data.items.forEach((item) => {
            const component = `pg${Common.capitalize(item.key)}`;
            $stateProvider.state({
                name: item.key,
                url: item.url,
                component,
            });

            // Плохо, что эта логика завязана на структуру json
            // как только json изменится, логику прийдётся править @todo: добавить test!
            const subitems = item.items;
            if (subitems) {
                subitems.forEach((subitem) => {
                    const state = {
                        name: `${item.key}.${subitem.key}`,
                        url: subitem.url,
                        component: `${component}${Common.capitalize(subitem.key)}`,
                    };

                    $stateProvider.state(state);
                });
            }
        });

        // $urlRouterProvider.otherwise('/');
    }

    static get module() {
        try {
            return angular.module(this.name);
        } catch (err) {
            return angular.module(this.name, requires)
                .config(this.setStates)
                .service(Srvc.name, ($state, $transitions) => new Srvc({ $state, $transitions }));
        }
    }
}

export default Routing.module.name;
