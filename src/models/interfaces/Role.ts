import {RoleNameEmum} from 'src/consts/RoleNameEmum';

export type RoleType = {
    id?: string;
    roleName: keyof typeof RoleNameEmum
}


export interface Role {
    getByRoleName(name: RoleType['roleName']): Promise<RoleType>;
}
