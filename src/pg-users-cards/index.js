import angular from 'angular';

import { naming, config } from './pg-users-cards.config';
import Ctrl from './pg-users-cards.controller';

let module;
try {
    module = angular.module(naming.aka);
} catch (err) {
    module = angular.module(naming.aka, [])
        .component(
            naming.aka, {
                ...config,
                controller: ($q, PgUsersSrvc) => new Ctrl({
                    $q, PgUsersSrvc,
                }),
            },
        );
}

export default module.name;
