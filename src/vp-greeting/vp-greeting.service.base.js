import { errors as commonErrors } from '@/common/common.config';

class VpGreetingServiceBase {
    /* @ngInject */
    constructor($http, $q) {
        this.$http = $http;

        // Используем $q, а не ES6 Promise, чтобы не городить огород с ручным обновлением view
        this.$q = $q;

        if (new.target === VpGreetingServiceBase) {
            throw new TypeError(commonErrors.ABSTRACT_CANT_BE_INSTANTIATED);
        }
    }

    getGreetString() {
        throw new Error(`${commonErrors.NEED_IMPLEMENT_METHOD} getGreetString`);
    }

    static get aka() {
        return 'VpGreetingService';
    }
}

export default VpGreetingServiceBase;
