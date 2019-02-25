class VpGreetingServiceBase {
    /* @ngInject */
    constructor($http, $q) {
        this.$http = $http;

        // Используем $q, а не ES6 Promise, чтобы не городить огород с ручным обновлением view
        this.$q = $q;
    }

    getGreetString() {
        throw new Error('Implement this method!');
    }

    static get aka() {
        return 'VpGreetingService';
    }
}

export default VpGreetingServiceBase;
