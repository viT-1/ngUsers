import uiRouter from '@uirouter/angularjs';

// Routes
import pgBooksModuleName from '@/pg-books';
import pgUsersModuleName from '@/pg-users';
import pgWelcomeModuleName from '@/pg-welcome';

// eslint-disable-next-line import/prefer-default-export
export const requires = [
    uiRouter, // @link: ui-router.github.io Рекомендован toddmotto вместо родного 'ngRoute'
    pgBooksModuleName,
    pgUsersModuleName,
    pgWelcomeModuleName,
];
