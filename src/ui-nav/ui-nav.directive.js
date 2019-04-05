import UiBaseDirective from '@/ui-base-directive';
import Ctrl from './ui-nav.controller';
import { config, naming, iamCssInitMods } from './ui-nav.config';

class UiNavDirective extends UiBaseDirective {
    // В базовом классе нельзя не передавать параметры,
    // потому дополняем конструктор параметрами
    constructor(params) {
        const iamCss = params && params.iamCss
            ? { ...iamCssInitMods, ...params.iamCss } : iamCssInitMods;

        super({
            ...config,
            naming,
            // Если определяем свой контроллер, то iamCss нет смысла передавать в базовую директиву
            // iamCss,
            controller: RoutingSrvc => new Ctrl({
                RoutingSrvc,
                naming,
                iamCss,
            }),
            // Чтобы иметь возможность создавать директиву
            // с отличными от config настройками (например iamCss dirHoriz)
            ...params,
        });
    }

    link(scope, el, attrs, ctrl, transclude) {
        super.link(scope, el, attrs, ctrl, transclude);

        // Accessability area-role
        if (el[0].tagName !== 'NAV') {
            attrs.$set('role', 'navigation');
        }
    }
}

export default UiNavDirective;
