import Common from '@/common';
import jsonNaming from './pg-users.naming.json';

const { attr } = jsonNaming;
export const naming = {
    attr,
    aka: Common.directiveNormalize(attr),
};

export const config = {
    templateUrl: '/tmpl/pg-users',
    bindings: {},
    scope: {},
};

export const errors = {
    NEED_INJECT: 'Need service injection for:',
};
