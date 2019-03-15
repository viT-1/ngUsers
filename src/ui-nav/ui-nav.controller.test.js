import { naming } from './ui-nav.config';

import UiNavDirectiveCtrl from './ui-nav.controller';

describe(`${naming.aka} controller`, () => {
    let ctrl;

    beforeEach(() => {
        ctrl = new UiNavDirectiveCtrl();
    });

    test('Контроллер создержит данные (data.items) для отрисовки template', () => {
        ctrl.$onInit();

        expect(ctrl.data).toBeDefined();
        expect(ctrl.data.items).toBeDefined();
    });
});
