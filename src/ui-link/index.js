import angular from 'angular';

import Drct from './ui-link.directive';
import { naming } from './ui-link.config';

let module;
try {
    module = angular.module(naming.aka);
} catch (err) {
    module = angular.module(naming.aka, [])
        .directive(naming.aka, () => new Drct());
}

export default module.name;
