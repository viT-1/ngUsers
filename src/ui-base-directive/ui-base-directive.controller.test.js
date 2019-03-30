import { errors as commonErrors } from '@/common/common.config';
import { errors } from './ui-base-directive.config';
import UiBaseDirectiveCtrl from './ui-base-directive.controller';

const naming = { attr: 'base-dir', aka: 'baseDir' };
const iamCssInitMods = { v: 'v1-0' };

describe(`${naming.aka} controller`, () => {
    test('Попытка создать контроллера без параметров вызывает ошибку', () => {
        expect(() => { new UiBaseDirectiveCtrl(); })
            .toThrowError(commonErrors.NEED_PARAMS);
    });

    test('Попытка создать контроллера без параметра naming вызывает ошибку', () => {
        expect(() => { new UiBaseDirectiveCtrl({ some: 'thing' }); })
            .toThrowError(errors.NEED_NAMING);
    });

    test('Если в конструктор контроллера передан naming, то всё Ok', () => {
        new UiBaseDirectiveCtrl({ naming });
    });

    test('Контроллер содержит свойство iamCss необходимое для link директивы', () => {
        const ctrl = new UiBaseDirectiveCtrl({ naming, iamCss: iamCssInitMods });

        expect(ctrl.iamCss).toBeDefined();
    });
});
