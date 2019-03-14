import UiBaseDirective from '@/ui-base-directive';
import { config, naming, iamCssInitMods } from './ui-nav.config';

class UiNavDirective extends UiBaseDirective {
    constructor() {
        const params = { ...config, naming, iamCss: iamCssInitMods };
        console.log('UiNavDirective params', params);
        super(params);
    }
}

export default UiNavDirective;
