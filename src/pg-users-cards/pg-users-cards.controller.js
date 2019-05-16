import { errors as commonErrors } from '@/common/common.config';

class PgUsersCards {
    constructor(params) {
        if (!params) {
            throw new Error(commonErrors.NEED_PARAMS);
        }

        // Если хоть одного из сервиса не будет, то
        const { $q, PgUsersSrvc } = params;
        const needInject = [];

        if (!$q) {
            needInject.push('$q');
        }

        if (!PgUsersSrvc) {
            needInject.push('PgUsersSrvc');
        }

        if (needInject.length) {
            throw new Error(`${commonErrors.NEED_INJECT} ${needInject.sort().join(', ')}`);
        }

        Object.assign(this, { $q, PgUsersSrvc });
    }

    $onInit() {
        this.PgUsersSrvc.getUsers()
            .then((resp) => {
                this.items = resp.data.items;
            });
    }
}

export default PgUsersCards;
