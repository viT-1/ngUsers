const { sourcePath } = require('./config');

const jestConfig = {
    // Мэппинг по структуре проекта - какие тесты запускать из под jest
    testRegex: `./${sourcePath}/(.*?)/(.*?)\\.(test|spec)\\.js$`,

    // Что исключить из вышеуказанной маски?
    testPathIgnorePatterns: [],

    // Каталоги создаваемые node-модулем должны храниться в node_modules,
    // а не засорять корневой каталог
    cacheDirectory: './node_modules/.cache/jest',

    // Смотрим на процент покрытия тестами
    collectCoverage: true,
    coverageReporters: ['text', 'clover'],
    coverageDirectory: 'jest-report',

    // Ограничиваемся тестами на модули для реиспользования.
    collectCoverageFrom: [
        `${sourcePath}/**/*.js`,
        `!${sourcePath}/**/*.config.js`,
        `!${sourcePath}/**/*.test.js`,
        // Корневой index.js всего лишь инициализация компонент для браузера - не реиспользуется
        '!**/index.js',
    ],

    // Чтобы расписывал все тесты по шагам (иначе не показывает шаги, если тестов больше чем 1)
    verbose: true,

    // Resolve ссылок на import в тестируемых модулях (подключённых через import в файл теста)
    moduleNameMapper: {
        '~/(.*)$': '<rootDir>/$1',
        '@/(.*)$': `<rootDir>/${sourcePath}/$1`,
    },

    transformIgnorePatterns: [
        './!node_modules\\/(angular)/',
    ],

    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.html$': 'html-loader-jest',
    },
};

module.exports = jestConfig;
