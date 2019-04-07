import Common from '@/common';
import { errors as commonErrors } from '@/common/common.config';

import { errors } from './pg-users.config';

class PgUsers {
    constructor(params) {
        if (!params) {
            throw new Error(commonErrors.NEED_PARAMS);
        }

        if (!params.$q) {
            throw new Error(`${errors.NEED_INJECT} $q`);
        }

        if (!params.PgUsersSrvc) {
            throw new Error(`${errors.NEED_INJECT} PgUsersSrvc`);
        }

        Object.assign(this, params);
    }

    setUsersByGroups() {
        const promises = [
            this.PgUsersSrvc.getUsers(),
            this.PgUsersSrvc.getGroups(),
            this.PgUsersSrvc.getUserIdsByGroupId(),
        ];

        // this.PgUsersSrvc.getUsers()
        this.$q.all(promises)
            .then((resps) => {
                this.users = resps[0].data.items;
                this.relations = resps[2].data.items;

                this.groups = [];

                const usersInDepartments = [];
                // type === 1 Только по подразделениям
                resps[1].data.items.filter(it => it.type === 1).forEach((group) => {
                    const { userIds } = this.relations.filter(rel => rel.groupId === group.id)[0];
                    userIds.forEach((uId) => {
                        if (!usersInDepartments.includes(uId)) {
                            usersInDepartments.push(uId);
                        }
                    });
                    const groupUsers = this.users.filter(user => userIds.includes(user.id));
                    this.groups.push({ ...group, users: groupUsers });
                });

                // Дополнительная группа пользователей "без группы"
                this.groups.push({
                    id: 0,
                    type: 1,
                    groupName: 'Вне подразделения',
                    users: this.users.filter(user => !usersInDepartments.includes(user.id)),
                });

                // Установка значения asBoss
                resps[1].data.items.filter(it => it.type === 0).forEach((group) => {
                    const { userIds } = this.relations.filter(rel => rel.groupId === group.id)[0];
                    userIds.forEach((uId) => {
                        this.users.filter(user => user.id === uId).forEach((user_) => {
                            const user = user_;
                            user.asBoss = group.groupName;
                            user.asBoddId = group.id;
                        });
                    });
                });
            })
            .catch(() => {});
    }

    $onInit() {
        this.setUsersByGroups();
    }
}

export default PgUsers;
