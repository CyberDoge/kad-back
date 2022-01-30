import {injectable} from 'inversify';
import {Role, RoleType} from '../interfaces';

@injectable()
export class InMemoryRole implements Role {
    private roles: RoleType[];

    constructor() {
        this.roles = [
            {
                id: `role${1}`,
                roleName: 'admin',
            },
            {
                id: `role${2}`,
                roleName: 'commonUser',
            },
            {
                id: `role${3}`,
                roleName: 'anon',
            },
            {
                id: `role${4}`,
                roleName: 'customer',
            },
            {
                id: `role${5}`,
                roleName: 'executor',
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
