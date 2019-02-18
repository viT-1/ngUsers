import angular from 'angular';
import { config, defaults } from './app.config';
import VpGreeting from '@/vp-greeting';

class App {
    constructor(params) {
        // Сначала указываем значения по умолчанию, затем params переопределяют данные значения
        const pa = { ...defaults, ...params };

        // Главный модуль ни от чего не зависит! Все компоненты отдельны.
        this.module = angular.module(pa.name, []);

        // Инициализация всех модулей
        // @todo: angular.module() кучи их
        VpGreeting.init({ appModule: this.module });

        function onDomLoaded() {
            angular.bootstrap(
                document.querySelector(pa.selector),
                config.modules.names.concat(pa.name),
            );
        }

        // Инициализирование корневого модуля. Все модули должны быть прежде проинициализированы.
        // angular.element(document).ready(onDomLoaded);

        // IE>8
        document.addEventListener('DOMContentLoaded', onDomLoaded);

        this.constructorParams = pa;
    }
}

export default App;
