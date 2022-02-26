import {UserType} from 'src/models/interfaces';
import {LoginCredentials} from 'src/types/request/LoginCredentials';

export interface LoginService {
    login(loginCredentials: LoginCredentials): Promise<UserType>;
}
