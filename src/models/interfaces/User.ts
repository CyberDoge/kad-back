import {Optional} from 'src/utils/typeUtils';
import {RoleType} from './Role';

export type UserType = {
    id: string;
    email: string;
    password: string;
    roles: RoleType[]
}

export interface User {
    findById(id: string): Promise<UserType | undefined>;

    findByEmail(email: string): Promise<UserType | undefined>;

    save(user: Optional<UserType, 'id'>): Promise<UserType>;
}
