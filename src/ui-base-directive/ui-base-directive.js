import { errors as commonErrors } from '@/common/common.config';

import { config, errors } from './ui-base-directive.config';
import UiBaseDirectiveCtrl from './ui-base-directive.controller';

// @link: https://stackoverflow.com/a/33714913
// @link: https://www.michaelbromley.co.uk/blog/exploring-es6-classes-in-angularjs-1.x/
// @link: https://embed.plnkr.co/0ly0Kx/
class UiBaseDirective {
    constructor(params) {
        if (!params) {
            throw new Error(commonErrors.NEED_PARAMS);
        }

        if (!{}.hasOwnProperty.call(params, 'naming')) {
            throw new Error(errors.NEED_NAMING);
        } else {
            // @link: https://docs.angularjs.org/api/ng/service/$compile#-scope-
            // @link: https://gist.github.com/CMCDragonkai/6282750
            // Чтобы управлять в контроллере this.uiLink
            // Предполагается на вход литерал, а не переменная вышестоящего scope
            // но также в контроллере обновляем это значение, потому <, а не @
            this.bindToController = { [params.naming.aka]: '<?' };
        }

        if (params.templateUrl) {
            delete config.template;
        }

        // Передаются параметры, значение params по умолчанию затирается
        // Если нет контроллера, то указываем базовый
        const assignCtrl = params.controller ? {} : {
            controller: () => new UiBaseDirectiveCtrl({
                naming: params.naming,
                iamCss: params.iamCss,
            }),
        };

        Object.assign(this, config, params, assignCtrl);
    }

    link(scope, el, attrs, ctrl, transclude) {
        const attrValue = ctrl[this.naming.aka];
        // Устанавливает исходному атрибуту JSON влияющий на CSS-стилизацию
        if (attrValue) {
            attrs.$set(this.naming.attr, JSON.stringify(ctrl[this.naming.aka]));
        }

        // Заменяем лишнюю вёрстку
        if (this.transclude) {
            el.find('ng-transclude').replaceWith(transclude());
        }
    }
}

export default UiBaseDirective;
