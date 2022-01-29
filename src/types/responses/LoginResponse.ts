import {UserType} from 'src/models/interfaces/User';

export interface LoginResponse {
    token: string;
    userId: UserType['_id'];
}
