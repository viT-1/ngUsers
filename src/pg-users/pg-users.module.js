import angular from 'angular';

import { aka, config } from './pg-users.config';
import Srvc from './pg-users.service';
import Ctrl from './pg-users.controller';

let module;
try {
    module = angular.module(aka);
} catch (err) {
    module = angular.module(aka, [])
        // $q нужен для mock в тестах
        .service(Srvc.name, $http => new Srvc({ $http }))
        .component(
            aka,
            { ...config, controller: ($q, PgUsersSrvc) => new Ctrl({ $q, PgUsersSrvc }) },
        );
}

export default module.name;
