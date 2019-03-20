import angular from 'angular';

import { aka, config } from './pg-books.config';

let module;
try {
    module = angular.module(aka);
} catch (err) {
    module = angular.module(aka, [])
        // @todo: в зависимости добавить uiRouter - в качестве ещё одного сервиса
        .component(aka, config);
}

export default module.name;
