import angular from 'angular';

import { name as appName } from '@/app/app.config';
import { name, requirements, config } from './vp-greeting.config';
import VpGreetingController from './vp-greeting__controller';

const component = { ...config, controller: VpGreetingController };

// Экспортируем имя, но как только импортируем этот модуль, сразу же его инициализируем
const vpGreetingModule = angular
    .module(`${appName}.${name}`, requirements)
    .component(name, component)
    .name;

export default vpGreetingModule;
