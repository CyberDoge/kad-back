import {RoleType} from 'src/models/interfaces/Role';

export interface AuthContext {
    getAuthScope(authorization: string): Promise<RoleType['roleName'][]>;
}
