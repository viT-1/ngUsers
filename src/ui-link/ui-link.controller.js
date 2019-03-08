import { iamCssInitMods } from './ui-link.config';

class UiLink {
    $onInit() {
        // Дополняем данные из binded attributes to controller
        this.uiLink = { ...iamCssInitMods, ...this.uiLink };
    }
}

export default UiLink;
