import Common from '@/common';
import routingModuleName from '@/routing';
import gettextModuleName from '@/gettext';

import jsonNaming from './ui-nav.naming.json';
import jsonIamCss from './ui-nav.iamCss.json';

export const naming = { ...jsonNaming, aka: Common.directiveNormalize(jsonNaming.attr) };

export const requires = [
    routingModuleName,
    gettextModuleName,
];

export const iamCssInitMods = {
    // '^': '#app', // context - any parent selector
    v: jsonIamCss.v,
    dir: jsonIamCss.dirVert,
    pos: jsonIamCss.posLeft,
};

export const config = {
    templateUrl: '/tmpl/ui-nav',
};
