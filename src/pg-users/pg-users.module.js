import angular from 'angular';

import { aka, config } from './pg-users.config';
import PgUsersSrvc_ from './pg-users.service';
import PgUsersCtrl from './pg-users.controller';

let module;
try {
    module = angular.module(aka);
} catch (err) {
    module = angular.module(aka, [])
        // $q нужен для mock в тестах
        .service(PgUsersSrvc_.name, $http => new PgUsersSrvc_({ $http }))
        .component(
            aka,
            { ...config, controller: PgUsersSrvc => new PgUsersCtrl({ PgUsersSrvc }) },
        );
}

export default module.name;
