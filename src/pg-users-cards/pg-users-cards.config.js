import Common from '@/common';

import jsonNaming from './pg-users-cards.naming.json';

const { attr } = jsonNaming;
export const naming = {
    attr,
    aka: Common.directiveNormalize(attr),
};

export const config = {
    templateUrl: '/tmpl/pg-users-cards',
    bindings: {
        search: '<?',
    },
    scope: {},
};
