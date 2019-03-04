class UiLink {
    /* @ngInject */
    constructor($attrs) {
        this.attrs = $attrs;
    }

    $onInit() {
        // this.test = 'Hi!';
        // console.log('Проверка изолированного scope', this.uiLink, this.attrs.uiLink);
    }
}

export default UiLink;
