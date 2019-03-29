// Для элемента меню Используем те же модификаторы, что и для всего меню
import { iamCssInitMods as navMods } from './ui-nav.config';

class UiNavItem {
    // @link: https://ultimatecourses.com/blog/angular-1-5-lifecycle-hooks
    // @link: https://medium.com/front-end-weekly/angular-js-onchanges-component-hook-use-case-switching-between-youtube-and-vimeo-players-based-on-61aa164dce87
    // @link: https://www.codelord.net/2016/12/20/replacing-angulars-deep-watches-with-the-%24docheck-lifecycle-hook/
    $doCheck() {
        if (this.data) {
            const { isCurrent } = this.data;
            if (isCurrent !== this.wasCurrent) {
                this.wasCurrent = isCurrent;
                this.navItemMods = { ...navMods, isCurrent };
            }
        }
    }
}

export default UiNavItem;
