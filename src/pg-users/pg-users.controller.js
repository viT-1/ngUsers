import { errors as commonErrors } from '@/common/common.config';

import { initValues } from './pg-users.config';

class PgUsers {
    constructor(params) {
        if (!params) {
            throw new Error(commonErrors.NEED_PARAMS);
        }

        const { $state } = params;
        const needInject = [];

        if (!$state) {
            needInject.push('$state');
        }

        if (needInject.length) {
            throw new Error(`${commonErrors.NEED_INJECT} ${needInject.sort().join(', ')}`);
        }

        Object.assign(this, { $state }, initValues);
    }

    $doCheck() {
        if (this.viewType !== this.oldViewType) {
            // console.log('viewType changed to', this.viewType);
            this.oldViewType = this.viewType;

            const siblingChgChar = this.$state.$current.name.includes('.') ? '^' : '';
            this.$state.go(`${siblingChgChar}.${this.viewType}`);
        }
    }
}

export default PgUsers;
