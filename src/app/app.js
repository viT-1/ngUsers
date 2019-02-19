import angular from 'angular';
import { name, defaults, requirements } from './app.config';

class App {
    constructor(params) {
        // Сначала указываем значения по умолчанию, затем params переопределяют данные значения
        const pa = { ...defaults, ...params };

        // Главный модуль ни от чего не зависит! Все компоненты отдельны.
        this.module = angular.module(name, requirements);

        // Инициализация всех модулей
        // @todo: angular.module() кучи их - это происходит в import requirement

        function onDomLoaded() {
            angular.bootstrap(
                document.querySelector(pa.selector),
                [name],
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
