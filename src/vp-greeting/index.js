import angular from 'angular';

import { aka, config } from './vp-greeting.config';
import Ctrl from './vp-greeting.controller';
import Srvc from './vp-greeting.service';

let module;
try {
    module = angular.module(aka);
} catch (err) {
    module = angular.module(aka, [])
        .service(Srvc.name, Srvc)
        // @todo: в зависимости добавить uiRouter - в качестве ещё одного сервиса
        .component(aka, { ...config, controller: Ctrl });
}

export default module.name;
