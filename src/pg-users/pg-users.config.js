import Common from '@/common';
import gettextModuleName from '@/gettext';

import jsonNaming from './pg-users.naming.json';

const { attr } = jsonNaming;
export const naming = {
    attr,
    aka: Common.directiveNormalize(attr),
};

export const requires = [
    gettextModuleName,
];

export const config = {
    templateUrl: '/tmpl/pg-users',
    bindings: {},
    scope: {},
};

export const errors = {
};
