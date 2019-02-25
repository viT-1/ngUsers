import VpGreetingServiceBase from '../vp-greeting.service.base';

class VpGreetingService extends VpGreetingServiceBase {
    getGreetString(isNeedToFail) {
        const defer = this.$q.defer();

        if (isNeedToFail) {
            const reason = { data: { description: 'Dance!' } };
            defer.reject(reason);
        } else {
            defer.resolve({ data: { greet: 'Hi' } });
        }

        return defer.promise;
    }
}

export default VpGreetingService;
