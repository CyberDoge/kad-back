import {injectable} from 'inversify';
import {Role, RoleType} from '../interfaces';

@injectable()
export class InMemoryRole implements Role {
    private roles: RoleType[];

    constructor() {
        this.roles = [
            {
                id: `role${1}`,
                roleName: 'ADMIN',
            },
            {
                id: `role${2}`,
                roleName: 'COMMON_USER',
            },
            {
                id: `role${3}`,
                roleName: 'ANON',
            },
            {
                id: `role${4}`,
                roleName: 'CUSTOMER',
            },
            {
                id: `role${5}`,
                roleName: 'EXECUTOR',
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
