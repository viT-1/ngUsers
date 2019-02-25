import { aka, config } from './vp-greeting.config';
import vpGreetingModule from './vp-greeting.module';
import VpGreetingController from './vp-greeting.controller';
import VpGreetingService from './vp-greeting.service';

const component = { ...config, controller: VpGreetingController };

export default vpGreetingModule
    .service(VpGreetingService.aka, VpGreetingService)
    // @todo: в зависимости добавить uiRouter - в качестве ещё одного сервиса
    .component(aka, component)
    .name;
