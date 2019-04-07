import angular from 'angular';

import { naming, config } from './pg-users.config';
import Srvc from './pg-users.service';
import Ctrl from './pg-users.controller';

let module;
try {
    module = angular.module(naming.aka);
} catch (err) {
    module = angular.module(naming.aka, [])
        // $q нужен для mock в тестах
        .service(Srvc.name, $http => new Srvc({ $http }))
        .component(
            naming.aka,
            { ...config, controller: ($q, PgUsersSrvc) => new Ctrl({ $q, PgUsersSrvc }) },
        );
}

export default module.name;
