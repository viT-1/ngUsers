class VpGreetingController {
    /* @ngInject */
    constructor(VpGreetingService) {
        this.service = VpGreetingService;
    }

    $onInit() {
        this.service.getGreetString()
            .then((resp) => {
                this.greet = resp.data.greet;
            })
            .catch((resp) => {
                console.log('Ошибка при запросе VpGreetingService.getGreetString', resp.data);
            });

        this.TO = this.to.toUpperCase();
    }
}

export default VpGreetingController;
