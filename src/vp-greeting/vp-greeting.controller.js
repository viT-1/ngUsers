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
                if (resp.data) {
                    this.greet = resp.data.description;
                }
            });

        this.TO = this.to.toUpperCase();
    }
}

export default VpGreetingController;
