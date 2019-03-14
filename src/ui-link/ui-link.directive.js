import UiBaseDirective from '@/ui-base-directive';
import {
    config,
    naming,
    iamCssInitMods,
    errors,
} from './ui-link.config';

class UiLinkDirective extends UiBaseDirective {
    constructor() {
        super({ ...config, naming, iamCss: iamCssInitMods });
    }

    link(scope, el, attrs, ctrl, transclude) {
        if (el[0].tagName !== 'A') {
            throw new Error(errors.TAG_RESTRICTED);
        }

        super.link(scope, el, attrs, ctrl, transclude);
    }
}

export default UiLinkDirective;
