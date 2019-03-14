import jsonNaming from './ui-nav.naming.json';
import jsonIamCss from './ui-nav.iamCss.json';

export const naming = jsonNaming;
export const iamCssInitMods = {
    // '^': '#app', // context - any parent selector
    v: jsonIamCss.v,
    dir: jsonIamCss.dirVert,
};

export const config = {
    templateUrl: '/tmpl/ui-nav',
    transclude: false,
};
