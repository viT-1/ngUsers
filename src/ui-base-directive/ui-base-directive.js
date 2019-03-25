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

        // Передаются параметры, значение params по умолчанию затирается
        // Если нет контроллера, то указываем базовый
        const assignCtrl = params.controller ? {} : {
            controller: () => new UiBaseDirectiveCtrl({
                naming: params.naming,
                iamCss: params.iamCss,
            }),
        };

        Object.assign(this, config, params, assignCtrl);

        if (this.templateUrl) {
            delete this.template;
        }

        // Если template определён базовый, то включаем transclude
        if (this.template && this.template.includes('ng-transclude')) {
            this.transclude = true;
        }
    }

    link(scope, el, attrs, ctrl, transclude) {
        const attrValue = ctrl[this.naming.aka];

        if (attrValue) {
            const strAttrValue = JSON.stringify(ctrl[this.naming.aka]);
            if (strAttrValue !== '{}') {
                // Устанавливает исходному атрибуту JSON влияющий на CSS-стилизацию
                attrs.$set(this.naming.attr, strAttrValue);
            }
        }

        // Проблема с ng-repeat
        // @link: https://github.com/angular/angular.js/issues/7874#issuecomment-47647528
        if (this.transclude) {
            // Так не работает в связке с ng-repeat на нашем же DOM-элементе
            // el.find('ng-transclude').replaceWith(transclude());
            transclude((clone) => {
                // Если для transclude есть элементы
                if (clone[0]) {
                    // Заменяем лишнюю вёрстку-обёртку
                    if (el[0].tagName === 'NG-TRANSCLUDE') {
                        // Фильтрация в clone комментариев стандартных директив angularjs -> err
                        // console.log(this.naming.aka, clone);
                        // const filtered = Object.entries(clone).reduce((acc, pair) => {
                        //     const [key, value] = pair;
                        //     return (value.nodeType === 3) ? { ...acc, [key]: value } : acc;
                        // }, {});
                        // el.replaceWith(filtered);
                        el.replaceWith(clone);
                    } else {
                        el.find('ng-transclude').replaceWith(clone);
                    }
                } else {
                    // Если на ng-transclude ничего не пришло, шаблон отрисовываем без ng-transclude
                    el.find('ng-transclude').parent().empty();
                }
            });
        }
    }
}

export default UiBaseDirective;
