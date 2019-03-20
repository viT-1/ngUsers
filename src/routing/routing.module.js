import angular from 'angular';

import data from './routing.data.ru.json';
import { requires } from './routing.config';

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
