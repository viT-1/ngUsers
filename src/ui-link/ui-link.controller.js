import { iamCssInitMods, naming } from './ui-link.config';

class UiLink {
    $onInit() {
        // Дополняем данные из binded attributes to controller
        this[naming.aka] = { ...iamCssInitMods, ...this[naming.aka] };
    }
}

export default UiLink;
