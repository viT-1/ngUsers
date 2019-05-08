import Common from '@/common';

import jsonNaming from './pg-users-table.naming.json';

const { attr } = jsonNaming;
export const naming = {
    attr,
    aka: Common.directiveNormalize(attr),
};

export const config = {
    templateUrl: '/tmpl/pg-users-table',
    bindings: {
        search: '<?',
    },
    scope: {},
};
