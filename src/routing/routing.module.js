import angular from 'angular';

import data from './routing.data.ru.json';
import { requires } from './routing.config';

// Тесты!
// @link: https://medium.com/evbinary/angularjs-and-ui-router-testing-the-right-way-part-1-c165c4565549

class Routing {
    /* @ngInject */
    static setStates($stateProvider) {
        data.items.forEach((item) => {
            $stateProvider.state({
                name: item.key,
                url: item.url,
                component: `pg${item.key.charAt(0).toUpperCase()}${item.key.slice(1)}`,
            });
        });

        // $urlRouterProvider.otherwise('/');
    }

    static get module() {
        try {
            return angular.module(this.name);
        } catch (err) {
            return angular.module(this.name, requires)
                .config(this.setStates);
        }
    }
}

export default Routing.module.name;
