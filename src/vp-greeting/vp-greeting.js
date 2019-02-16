import config from './vp-greeting.config';

class VpGreeting {
    static init(params) {
        const { appModule } = params;
        appModule.component(config.name, config);
    }
}

export default VpGreeting;
