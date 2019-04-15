import angular from 'angular';
import { requires } from './gettext.config';
import dataRu from './gettext.data.ru.json';

class GetText {
    static run(gettextCatalog) {
        gettextCatalog.setStrings('ru', dataRu);
        gettextCatalog.setCurrentLanguage('ru');
    }

    static get module() {
        try {
            return angular.module(this.name);
        } catch (err) {
            return angular.module(this.name, requires)
                .run(GetText.run);
        }
    }
}

export default GetText.module.name;
