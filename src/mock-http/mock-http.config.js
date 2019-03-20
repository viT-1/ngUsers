import ngMockE2E from 'angular-mocks/ngMockE2E';

import tmplVpGreeting from '@/vp-greeting/vp-greeting.html';
import tmplUiNav from '@/ui-nav/ui-nav.html';
import tmplPgWelcome from '@/pg-welcome/pg-welcome.html';

export const templates = {
    'ui-nav': tmplUiNav,
    'vp-greeting': tmplVpGreeting,
    'pg-welcome': tmplPgWelcome,
    'pg-users': '<h1>ЮЗЕРС</h1>',
    'pg-books': '<h1>БУКС</h1>',
};

export const requires = [
    ngMockE2E,
];
