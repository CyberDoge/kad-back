import {RoleType} from './RoleType';

export type UserType = {
    _id: string;
    email: string;
    password: string;
    roles: RoleType[]
}

export interface User {
    findById(id: string): Promise<UserType | undefined>;
    findByEmail(email: string): Promise<UserType | undefined>;
    create(user: UserType): Promise<void>
}
