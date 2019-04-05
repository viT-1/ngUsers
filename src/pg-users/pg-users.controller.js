class PgUsers {
    constructor(params) {
        Object.assign(this, params);
    }

    $onInit() {
        this.PgUsersSrvc.getUsers()
            .then((resp) => {
                this.users = resp.data.items;
            })
            .catch(() => {});
    }
}

export default PgUsers;
