import angular from 'angular';

import { aka, config } from './vp-greeting.config';
import VpGreeting from './vp-greeting.controller';
import VpGreetingService from './vp-greeting.service';

const component = { ...config, controller: VpGreeting };

export default angular.module(aka, [])
    .service(VpGreetingService.aka, VpGreetingService)
    // @todo: в зависимости добавить uiRouter - в качестве ещё одного сервиса
    .component(aka, component)
    .name;
