import uiRouter from '@uirouter/angularjs';

import Common from '@/common';
import gettextModuleName from '@/gettext';

import pgUsersTableModuleName from '@/pg-users-table';

import jsonNaming from './pg-users.naming.json';

const { attr } = jsonNaming;
export const naming = {
    attr,
    aka: Common.directiveNormalize(attr),
};

export const requires = [
    uiRouter,
    gettextModuleName,
    pgUsersTableModuleName,
];

export const config = {
    templateUrl: '/tmpl/pg-users',
    bindings: {},
    scope: {},
};

export const initValues = {
    viewType: 'cards',
};
