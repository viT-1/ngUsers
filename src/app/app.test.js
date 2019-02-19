import { name, defaults } from './app.config';
import App from './app';

describe(name, () => {
    test('Если в конструктор не переданы параметры, они берутся из конфига', () => {
        const app = new App();

        expect(app.constructorParams).toEqual(defaults);
    });
});
