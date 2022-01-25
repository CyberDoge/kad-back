import {RoleType} from './Role';

export type UserType = {
    _id: string;
    email: string;
    password: string;
    roles: RoleType[]
}

export interface User {
    findById(id: string): Promise<UserType | undefined>;
    findByEmail(email: string): Promise<UserType | undefined>;
}
