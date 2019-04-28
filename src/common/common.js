class Common {
    // @url https://stackoverflow.com/questions/23078800/testing-if-a-method-returns-an-promise/23080414#23080414
    static isPromise(obj) {
        return !!obj.then && typeof obj.then === 'function';
    }

    // Скопировано из angularJs 1.7.7
    static directiveNormalize(name) {
        return name
            .replace(/^((?:x|data)[:\-_])/i, '')
            .replace(/[:\-_]+(.)/g,
                (_, letter, offset) => (offset ? letter.toUpperCase() : letter));
    }

    static capitalize(str) {
        return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
    }
}

export default Common;
