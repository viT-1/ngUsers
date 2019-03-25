import UiBaseDirectiveCtrl from '@/ui-base-directive/ui-base-directive.controller';

import { naming, iamCssInitMods } from './ui-nav.config';
import { jsonData } from '@/routing';

class UiNavDirectiveCtrl extends UiBaseDirectiveCtrl {
    // Дополнительные параметры возможно прокидывать только через конструктор директивы
    // params могут быть не переданы, когда класс контроллера создаётся сам по себе
    constructor(params) {
        super({
            naming,
            iamCss: iamCssInitMods,
            ...params,
        });

        if (params) {
            // @link: https://ui-router.github.io/guide/ng1/migrate-to-1_0#state-change-events
            // @link: https://next.plnkr.co/edit/AO49n8biBBEnfnsxPbns?p=preview&preview

            // Поскольку ловим только изменение состояния,
            // то начальное состояние тащим из другого провайдера
            this.navItemCurrent = params.$state.$current.name;

            // Как передать эту логику в контроллер директивы/компоненты
            // @link: https://github.com/angular-ui/ui-router/issues/3110#issuecomment-271942355
            params.$transitions.onStart({},
                (transition) => {
                    this.navItemCurrent = transition.$to().name;
                });
        }
    }

    $onInit() {
        super.$onInit();

        // Добавляем данные для отрисовки элементов навигации при помощи сервиса
        this.data = jsonData;
    }
}

export default UiNavDirectiveCtrl;
