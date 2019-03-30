import { errors as commonErrors } from '@/common/common.config';
import VpGreetingSrvcBase from './vp-greeting.service.base';

class InheritedClassComponent extends VpGreetingSrvcBase {}

describe(`${VpGreetingSrvcBase.name} base class`, () => {
    it('Нельзя создать абстрактный объект VpGreetingServiceBase', () => {
        expect(() => { new VpGreetingSrvcBase(); })
            .toThrowError(commonErrors.ABSTRACT_CANT_BE_INSTANTIATED);
    });
    test('Наследник обязан реализовать метод getGreetString - без реализации выдаётся ошибка', () => {
        expect(() => { new InheritedClassComponent().getGreetString(); })
            .toThrowError(`${commonErrors.NEED_IMPLEMENT_METHOD} getGreetString`);
    });
});
