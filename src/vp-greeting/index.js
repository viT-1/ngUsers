import angular from 'angular';

import { aka, config } from './vp-greeting.config';
import VpGreetingCtrl from './vp-greeting.controller';
import VpGreetingSrvc from './vp-greeting.service';

let module;
try {
    module = angular.module(aka);
} catch (err) {
    module = angular.module(aka, [])
        .service(VpGreetingSrvc.name, VpGreetingSrvc)
        // @todo: в зависимости добавить uiRouter - в качестве ещё одного сервиса
        .component(aka, { ...config, controller: VpGreetingCtrl });
}

export default module.name;
