import {LoginCredentials} from 'src/types/request/LoginCredentials';
import {LoginResponse} from 'src/types/responses/LoginResponse';

export interface LoginService {
    checkCredentials(loginCredentials: LoginCredentials): Promise<boolean>;

    login(loginCredentials: LoginCredentials): Promise<LoginResponse>;
}
