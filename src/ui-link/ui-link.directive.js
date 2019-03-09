import { config, naming, errors } from './ui-link.config';
import UiLinkCtrl from './ui-link.controller';

// @link: https://stackoverflow.com/a/33714913
// @link: https://www.michaelbromley.co.uk/blog/exploring-es6-classes-in-angularjs-1.x/
// @link: https://embed.plnkr.co/0ly0Kx/
class UiLinkDirective {
    constructor(ctrl = UiLinkCtrl) {
        Object.assign(this, config);
        this.controller = ctrl;
    }

    // eslint-disable-next-line class-methods-use-this
    link(scope, el, attrs, ctrl, transclude) {
        if (el[0].tagName !== 'A') {
            throw new Error(errors.TAG_RESTRICTED);
        }

        // Устанавливает исходному атрибуту JSON влияющий на CSS-стилизацию
        attrs.$set(naming.attr, JSON.stringify(ctrl[naming.aka]));

        // Заменяем лишнюю вёрстку
        el.find('ng-transclude').replaceWith(transclude());
    }
}

export default UiLinkDirective;
