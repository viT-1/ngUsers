import VpGreetingServiceBase from './vp-greeting.service.base';

class VpGreetingService extends VpGreetingServiceBase {
    getGreetString() {
        return this.$http.get('/api/greeting');

        // Ok
        // const defer = this.$q.defer();
        // this.$http.get('/api/greeting')
        //     .then((resp) => {
        //         console.log('VpGreetingService.getGreetString then', resp);
        //         defer.resolve(resp);
        //     })
        //     .catch(() => {});
        // return defer.promise;
    }
}

export default VpGreetingService;
