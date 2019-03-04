import angular from 'angular';

import { config, iamCssInitMods } from './ui-link.config';
import UiLinkCtrl from './ui-link.controller';

class uiLink {
    static get aka() {
        return 'uiLink';
    }

    static link(scope, el, attrs, ctrls, transclude) {
        if (el[0].tagName !== 'A') {
            throw new Error('uiLink restricted for "a" tag');
        }

        const iamMod = Object.keys(iamCssInitMods).length ? JSON.stringify(iamCssInitMods) : null;

        // Устанавливаем настройки для css по умолчанию, либо берём переданные
        if (!attrs.uiLink && iamMod) {
            attrs.$set('ui-link', iamMod);
        }

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

export default uiLink.module.name;
