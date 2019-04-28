// import { jsonData } from '@/routing';
import jsonData from './routing.data.json';

class RoutingSrvc {
    // constructor(params) {
    constructor($state, $transitions) {
        // const { $state, $transitions } = params;

        this.routingItems = [];

        RoutingSrvc.createRoutingItems({
            node: jsonData,
            // Поскольку ловим только изменение состояния,
            // то начальное состояние тащим из другого провайдера
            activeKey: $state.$current.name,
            rItems: this.routingItems,
        });

        // @link: https://ui-router.github.io/guide/ng1/migrate-to-1_0#state-change-events
        // @link: https://next.plnkr.co/edit/AO49n8biBBEnfnsxPbns?p=preview&preview

        // Как передать эту логику в контроллер директивы/компоненты
        // @link: https://github.com/angular-ui/ui-router/issues/3110#issuecomment-271942355
        $transitions.onStart({},
            transition => RoutingSrvc.changeRoutingItemsCurrentFlag({
                prevKey: transition.$from().name,
                activeKey: transition.$to().name,
                rItems: this.routingItems,
            }));
    }

    /**
     * Перечисление всех состояний, в том числе и дочерних
     * @readonly
     * @memberof RoutingSrvc
     */
    get items() {
        return this.routingItems;
    }

    /**
     * Для отрисовки главных разделов навигации исключены все дочерние состояния
     * @readonly
     * @memberof RoutingSrvc
     */
    get mainItems() {
        return this.routingItems.filter(item => !item.key.includes('.'));
    }

    /**
     * Инициализация всех routing-состояний, в том числе указание активного.
     * Из дерева нужно получить плоский набор состояний (дочерние указываются через точку)
     * Сразу в routing.data.json хранить плоский список не стал, так как переход
     * по дочерним состояниям при помощи $state.go не включает весь путь (через точку) к состоянию
     * @static
     * @param {*} node узел дерева может содержать свойство items, в которых
     * есть key (для activeKey). Каждый эл. содержит { key, url },
     * иерархия реализуется за счёт json-иерархии по items уровней вложенности пока 2
     * @param {*} activeKey Ключ, указывающий на активное состояние в формате `${parentsKey}.{key}`
     * @param {*} parent Для составного ключа нужен родительский элемент
     * @returns Набор routing-состояний для uiRouter $state.go(key) каждый эл. содержит { key, url }
     * Иерархия отображается в key через точку в виде `${parentsKey}.{key}`
     * @memberof RoutingSrvc
     */
    static createRoutingItems(params) {
        const {
            node,
            activeKey,
            parent,
            rItems,
        } = params;

        if (node) {
            const { key: nKey, url, items } = node;

            // Самый Корневой элемент не имеет key и не является состоянием
            if (nKey) {
                const key = parent && parent.key ? `${parent.key}.${nKey}` : nKey;

                rItems.push({
                    key,
                    url,
                    isCurrent: (key === activeKey),
                });
            }

            if (items && items.length) {
                items.forEach((el) => {
                    this.createRoutingItems({
                        node: el,
                        activeKey,
                        parent: node,
                        // Собираем все состояния рекурсивно в один и тот же массив
                        rItems,
                    });
                });
            }
        }
    }

    /**
     * Изменение в массиве состояний свойства isCurrent.
     * Вынесено в статическую функцию с передачей ссылки на изменяемый массив,
     * чтобы проще было протестировать код по отдельности кусочками, а не монолитом
     * uiRouter имеет только одно активное состояние (в том числе конкретное дочернее),
     * rItems имеет одну активную цепочку состояний (все её вложенные элементы isCurrent == true),
     * соответственно mainItems (для uiNav) обязательно имеют один isCurrent,
     * соответствдочернее состояние дочернему из uiRouter
     * @static
     * @param {*} params
     * @param {*} params.rItems Массив состояний, элементы которого имеют свойства key и isCurrent
     * @param {*} params.prevKey Предыдущее активное состояние, по которому можно вычислить все
     * значения isCurrent, которые следует поменять. Предполагается, что количество перебора
     * в глубину по родителям меньше, чем количество всех состояний, потому устанавливаем
     * isCurrent = false у конкретных элементов, а не у всех в rItems
     * @param {*} params.activeKey Ключ состояния становящегося активным, по нему активируется
     * вся цепочка до самого корневого родителя и сам элемент.
     * @memberof RoutingSrvc
     */
    static changeRoutingItemsCurrentFlag(params) {
        const { rItems, prevKey, activeKey } = params;

        function helper(key, isCurrent) {
            if (key) {
                const keys = RoutingSrvc.parsePath({ path: key });
                keys.forEach((k) => {
                    const index = rItems.findIndex(item => item.key === k);

                    if (index > -1) {
                        rItems[index].isCurrent = isCurrent;
                    }
                });
            }
        }

        helper(prevKey, false);
        helper(activeKey, true);
    }

    /**
     * Разбивает строку на цепочку родителей - ребёнка (конечный узел в path)
     * Например url/to/something преобразует в [url, url/to]
     *
     * @static
     * @param {*} params
     * @param {*} param.path Исходная строка/состояние с разделителями
     * @param {*} params.delim Символ разделителя (по умолчанию .)
     * (по умолчанию нет)
     * @returns Массив, где каждый элемент это подстрока исходной строки
     * @memberof RoutingSrvc
     */
    static parsePath(params) {
        const { path } = params;
        const delim = params.delim || '.';
        const arr = path.split(delim);

        const parsed = [];
        parsed.push(arr.shift());
        arr.forEach((p) => {
            parsed.push(`${parsed[parsed.length - 1]}${delim}${p}`);
        });

        return parsed;
    }
}

export const aka = RoutingSrvc.name;

export default RoutingSrvc;
