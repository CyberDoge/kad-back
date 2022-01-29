export type RoleType = {
    _id: string;
    roleName: 'anon' | 'commonUser' | 'admin'
}

export interface Role {
    getByRoleName(name: RoleType['roleName']): Promise<RoleType>;
}
