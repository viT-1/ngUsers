import angular from 'angular';

import { naming, config } from './pg-users-table.config';
import Ctrl from './pg-users-table.controller';

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
