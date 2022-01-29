import {Role} from '../interfaces';
import {RoleType} from '../interfaces/RoleType';

export class InMemoryRole implements Role {
    private roles: RoleType[];

    constructor() {
        this.roles = [
            {
                _id: `role${1}`,
                roleName: 'admin',
            },
            {
                _id: `role${2}`,
                roleName: 'commonUser',
            },
            {
                _id: `role${3}`,
                roleName: 'anon',
            }
        ];
    }

    async getByRoleName(name: RoleType['roleName']): Promise<RoleType> {
        const roleType = this.roles.find(r => r.roleName === name);
        if (!roleType) {
            throw new Error(`invalid roleName=${name}provided`);
        }
        return roleType;
    }
}
