export const config = {
    restrict: 'A',
    scope: {},
    // Стандартным образом: через $ctrl, прибиндить значения в шаблон директивы не получится
    // такое поведение только у компонент, но мы будем придерживаться тех же правил
    controllerAs: '$ctrl',
};

export const errors = {
    NEED_NAMING: 'В параметрах конструктора укажите naming: { aka: "someAttr"; attr: "some-attr" }',
};
