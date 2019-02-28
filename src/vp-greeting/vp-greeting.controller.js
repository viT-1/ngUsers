class VpGreetingController {
    /* @ngInject */
    constructor(VpGreetingService) {
        this.service = VpGreetingService;
    }

    $onInit() {
        this.service.getGreetString()
            .then((resp) => {
                this.greet = resp.data.greet;
                console.log('Ответ then по service.getGreetString => /api/greeting:', resp);
            })
            .catch(() => {});

        this.TO = this.to.toUpperCase();
    }
}

export default VpGreetingController;
