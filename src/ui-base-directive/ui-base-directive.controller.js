import { errors as commonErrors } from '@/common/common.config';
import { errors } from './ui-base-directive.config';

class UiBaseDirectiveCtrl {
    constructor(params) {
        if (!params) {
            throw new Error(commonErrors.NEED_PARAMS);
        }

        if (!{}.hasOwnProperty.call(params, 'naming')) {
            throw new Error(errors.NEED_NAMING);
        }

        Object.assign(this, params);
    }

    $onInit() {
        // Дополняем версией директивы данные из binded attributes to controller
        this[this.naming.aka] = { ...this.iamCss, ...this[this.naming.aka] };
    }
}

export default UiBaseDirectiveCtrl;
