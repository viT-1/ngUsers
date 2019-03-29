// import { jsonData } from '@/routing';
import jsonData from './routing.data.ru.json';

class RoutingSrvc {
    // Как inject с помощью params?
    /* @ngInject */
    constructor($state, $transitions) {
        // console.log('sdfsdgsd', $state);

        Object.assign(this, { $state, $transitions });

        // Поскольку ловим только изменение состояния,
        // то начальное состояние тащим из другого провайдера
        this.initRoutingItems(jsonData.items, $state.$current.name);

        // @link: https://ui-router.github.io/guide/ng1/migrate-to-1_0#state-change-events
        // @link: https://next.plnkr.co/edit/AO49n8biBBEnfnsxPbns?p=preview&preview

        // Как передать эту логику в контроллер директивы/компоненты
        // @link: https://github.com/angular-ui/ui-router/issues/3110#issuecomment-271942355
        $transitions.onStart({},
            (transition) => {
                // В тестах, в отличии от браузера первое значение по умолчанию инициализировано
                if (transition.$from().name) {
                    const indexPrevActiveItem = this.routingItems
                        .findIndex(item => item.key === transition.$from().name);

                    this.routingItems[indexPrevActiveItem].isCurrent = false;
                }

                const indexCurrentActiveItem = this.routingItems
                    .findIndex(item => item.key === transition.$to().name);

                this.routingItems[indexCurrentActiveItem].isCurrent = true;
            });
    }

    get items() {
        return this.routingItems;
    }

    initRoutingItems(items, key) {
        this.routingItems = items.map((_el) => {
            const el = { ..._el };
            el.isCurrent = (key === el.key);
            return el;
        });
    }
}

export const aka = RoutingSrvc.name;

export default RoutingSrvc;
