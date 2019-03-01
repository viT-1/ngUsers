import VpGreetingServiceBase from './vp-greeting.service.base';

class VpGreetingService extends VpGreetingServiceBase {
    getGreetString() {
        return this.$http.get('/api/greeting');
    }
}

export default VpGreetingService;
