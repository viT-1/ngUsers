import { errors } from './pg-users.config';

class PgUsersSrvc {
    constructor(params) {
        Object.assign(this, params);

        if (!this.$http) {
            throw new Error(`${errors.NEED_INJECT} $http`);
        }
    }

    getUsers() {
        return this.$http.get('/api/user/list');
    }

    getGroups() {
        return this.$http.get('/api/user-group/list');
    }

    getUserIdsByGroupId(id) {
        return this.$http.get(`/api/user-ids-by-group-id/${id || 'list'}`);
    }
}

export default PgUsersSrvc;
