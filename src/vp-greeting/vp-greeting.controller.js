class VpGreeting {
    /* @ngInject */
    constructor(VpGreetingSrvc) {
        this.service = VpGreetingSrvc;
    }

    $onInit() {
        this.service.getGreetString()
            .then((resp) => {
                this.greet = resp.data.greet;
            })
            .catch(() => {});

        this.TO = this.to.toUpperCase();
    }
}

export default VpGreeting;
