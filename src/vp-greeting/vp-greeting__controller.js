class VpGreetingController {
    /* @ngInject */
    $onInit() {
        this.greet = 'Hello';
        this.TO = this.to.toUpperCase();
    }
}

export default VpGreetingController;
