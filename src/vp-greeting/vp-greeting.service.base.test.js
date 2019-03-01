import { errors as commonErrors } from '@/common/common.config';
import VpGreetingServiceBase from './vp-greeting.service.base';

class InheritedClassComponent extends VpGreetingServiceBase {}

describe(`${VpGreetingServiceBase.aka} base class`, () => {
    it('Нельзя создать абстрактный объект VpGreetingServiceBase', () => {
        expect(() => { new VpGreetingServiceBase(); })
            .toThrowError(commonErrors.ABSTRACT_CANT_BE_INSTANTIATED);
    });
    test('Наследник обязан реализовать метод getGreetString - без реализации выдаётся ошибка', () => {
        expect(() => { new InheritedClassComponent().getGreetString(); })
            .toThrowError(`${commonErrors.NEED_IMPLEMENT_METHOD} getGreetString`);
    });
});
