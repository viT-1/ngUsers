import angular from 'angular';

import { naming, requires, config } from './pg-users.config';
import dataRu from './pg-users.translate.ru.json';
import Srvc from './pg-users.service';
import Ctrl from './pg-users.controller';


class PgUsers {
    static run(gettextCatalog) {
        gettextCatalog.setStrings('ru', dataRu);
    }

    static get module() {
        try {
            return angular.module(naming.aka);
        } catch (err) {
            return angular.module(naming.aka, requires)
                .run(PgUsers.run)
                // $q нужен для mock в тестах
                .service(Srvc.name, $http => new Srvc({ $http }))
                .component(
                    naming.aka, {
                        ...config,
                        controller: ($q, PgUsersSrvc) => new Ctrl({ $q, PgUsersSrvc }),
                    },
                );
        }
    }
}

export default PgUsers.module.name;
