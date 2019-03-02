import angular from 'angular';

import { aka, config } from './vp-greeting.config';
import VpGreetingCtrl from './vp-greeting.controller';
import VpGreetingSrvc from './vp-greeting.service';

const component = { ...config, controller: VpGreetingCtrl };

class VpGreeting {
    static get module() {
        try {
            return angular.module(aka);
        } catch (err) {
            return angular.module(aka, [])
                .service(VpGreetingSrvc.aka, VpGreetingSrvc)
                // @todo: в зависимости добавить uiRouter - в качестве ещё одного сервиса
                .component(aka, component);
        }
    }
}

export default VpGreeting.module.name;
