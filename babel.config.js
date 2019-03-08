// @babel/preset-env и этот конфиг не понадобился, если бы не баг jest
// @url: https://github.com/facebook/jest/issues/6229#issuecomment-450280779

module.exports = (api) => {
    api.cache(false);

    // const presets = ['@babel/preset-env'];
    const presets = [['@babel/preset-env', { useBuiltIns: 'entry' }]];
    const plugins = [['angularjs-annotate', { explicitOnly: true }]];

    return {
        presets,
        plugins,
    };
};
