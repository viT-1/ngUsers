class Common {
    // @url https://stackoverflow.com/questions/23078800/testing-if-a-method-returns-an-promise/23080414#23080414
    static isPromise(obj) {
        return !!obj.then && typeof obj.then === 'function';
    }
}

export default Common;
