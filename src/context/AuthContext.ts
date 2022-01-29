import {RoleType} from '../models/interfaces/RoleType';

export interface AuthContext {
    getAuthScope(authorization: string): Promise<RoleType['roleName'][]>;
}
