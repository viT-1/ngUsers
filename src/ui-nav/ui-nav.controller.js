import { errors as commonErrors } from '@/common/common.config';
import UiBaseDirectiveCtrl from '@/ui-base-directive/ui-base-directive.controller';
import { aka as routingSrvcName } from '@/routing/routing.service';

import { naming, iamCssInitMods } from './ui-nav.config';

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
            if (!params[routingSrvcName]) {
                throw new Error(`${commonErrors.DEPENDENCY_FAILED}: ${routingSrvcName} not found`);
            } else {
                this.svc = params[routingSrvcName];
            }
        }
    }

    $onInit() {
        super.$onInit();

        // Добавляем данные для отрисовки элементов навигации при помощи сервиса
        // Reactive: Нужен ли watcher, т.к. svc.items меняются
        this.items = this.svc.items;
    }
}

export default UiNavDirectiveCtrl;
