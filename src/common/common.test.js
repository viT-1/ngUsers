import Common from './common';

describe('Common normalizeAttributeName', () => {
    test('Атрибут ng:repeat должен преобразовываться в ngRepeat', () => {
        expect(Common.directiveNormalize('ng:repeat')).toEqual('ngRepeat');
    });
    test('Атрибут ui-block__elem--mod должен преобразовываться в uiBlockElemMod', () => {
        expect(Common.directiveNormalize('ui-block__elem--mod')).toEqual('uiBlockElemMod');
    });
});
