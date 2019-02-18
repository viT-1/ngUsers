import { defaults, config } from './vp-greeting.config';

class VpGreeting {
    static init(params) {
        const { appModule } = params;
        appModule.component(defaults.name, config);
    }
}

export default VpGreeting;
