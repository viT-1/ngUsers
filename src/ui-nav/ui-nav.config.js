import Common from '@/common';
import routingModuleName from '@/routing';

import jsonNaming from './ui-nav.naming.json';
import jsonIamCss from './ui-nav.iamCss.json';

jsonNaming.aka = Common.directiveNormalize(jsonNaming.attr);
export const naming = jsonNaming;

export const requires = [
    routingModuleName,
];

export const iamCssInitMods = {
    // '^': '#app', // context - any parent selector
    v: jsonIamCss.v,
    dir: jsonIamCss.dirVert,
};

export const config = {
    templateUrl: '/tmpl/ui-nav',
};
