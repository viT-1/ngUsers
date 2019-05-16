import ngMockE2E from 'angular-mocks/ngMockE2E';

import tmplVpGreeting from '@/vp-greeting/vp-greeting.html';
import tmplUiNav from '@/ui-nav/ui-nav.html';
import tmplUiNavItem from '@/ui-nav/ui-nav__item.html';
import tmplPgWelcome from '@/pg-welcome/pg-welcome.html';
import tmplPgUsers from '@/pg-users/pg-users.html';
import tmplPgUsersTable from '@/pg-users-table/pg-users-table.html';
import tmplPgUsersCards from '@/pg-users-cards/pg-users-cards.html';

export const templates = {
    'ui-nav': tmplUiNav,
    'ui-nav__item': tmplUiNavItem,
    'vp-greeting': tmplVpGreeting,
    'pg-welcome': tmplPgWelcome,
    'pg-users': tmplPgUsers,
    'pg-users-table': tmplPgUsersTable,
    'pg-users-cards': tmplPgUsersCards,
    'pg-books': '<h1>БУКС</h1>',
};

export const requires = [
    ngMockE2E,
];
