import VpGreetingSrvcBase from './vp-greeting.service.base';

class VpGreetingSrvc extends VpGreetingSrvcBase {
    getGreetString() {
        return this.$http.get('/api/greeting');
    }
}

export default VpGreetingSrvc;
