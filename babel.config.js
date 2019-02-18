// @babel/preset-env и этот конфиг не понадобился, если бы не баг jest
// @url: https://github.com/facebook/jest/issues/6229#issuecomment-450280779

module.exports = (api) => {
    api.cache(false);

    const presets = [
        // Необходим для того, чтобы транспиляция из ES6 всё же была
        '@babel/preset-env',
    ];

    return {
        presets,
    };
};
