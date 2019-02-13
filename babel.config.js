module.exports = function (api) {
    api.cache(false);

    const presets = [
        // Необходим для того, чтобы транспиляция из ES6 всё же была
        '@babel/preset-env',
    ];

    return {
        presets,
    };
};
