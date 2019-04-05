
class PgUsersSrvc {
    constructor(params) {
        Object.assign(this, params);

        if (!this.$http) {
            throw new Error();
        }
    }

    getUsers() {
        return this.$http.get('/api/user/list');
    }

    getGroups() {
        return this.$http.get('/api/user-group/list');
    }

    getUserIdsByGroupId(id) {
        return this.$http.get(`/api/user-ids-by-group-id/${id}`);
    }
}

export default PgUsersSrvc;
