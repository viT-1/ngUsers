import UiBaseDirectiveCtrl from '@/ui-base-directive/ui-base-directive.controller';

import { naming, iamCssInitMods } from './ui-nav.config';
import jsonData from './ui-nav.data.ru.json';

class UiNavDirectiveCtrl extends UiBaseDirectiveCtrl {
    // Дополнительные параметры возможно прокидывать только через конструктор директивы
    constructor() {
        super({
            naming,
            iamCss: iamCssInitMods,
            // На вход контроллеру кроме вышеперечисленного ничего не нужно, используем сервисы
            // ...params,
        });
    }

    $onInit() {
        super.$onInit();

        // Добавляем данные для отрисовки элементов навигации при помощи сервиса
        this.data = jsonData;
    }
}

export default UiNavDirectiveCtrl;
