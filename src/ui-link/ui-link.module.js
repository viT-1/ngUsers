import angular from 'angular';

import { config, errors } from './ui-link.config';
import UiLinkCtrl from './ui-link.controller';

class uiLink {
    static get aka() {
        return 'uiLink';
    }

    static link(scope, el, attrs, ctrls, transclude) {
        if (el[0].tagName !== 'A') {
            throw new Error(errors.TAG_RESTRICTED);
        }

        // Устанавливает исходному атрибуту JSON влияющий на CSS-стилизацию
        attrs.$set('ui-link', JSON.stringify(ctrls.uiLink));

        // Заменяем лишнюю вёрстку
        el.find('ng-transclude').replaceWith(transclude());
    }

    static get module() {
        try {
            return angular.module(uiLink.aka);
        } catch (err) {
            return angular.module(uiLink.aka, [])
                .directive(uiLink.aka, () => ({
                    ...config,
                    link: uiLink.link,
                    controller: UiLinkCtrl,
                }));
        }
    }
}

export const cl = uiLink;

export default uiLink.module.name;
