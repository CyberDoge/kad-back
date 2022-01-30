export type RoleType = {
    id?: string;
    roleName: 'anon' | 'commonUser' | 'admin' | 'customer' | 'executor'
}

export interface Role {
    getByRoleName(name: RoleType['roleName']): Promise<RoleType>;
}
