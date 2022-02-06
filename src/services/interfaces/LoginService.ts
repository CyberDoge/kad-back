import {AuthenticationError} from 'apollo-server-express';
import {LoginCredentials} from 'src/types/request/LoginCredentials';

export interface LoginService {
    login(loginCredentials: LoginCredentials): Promise<string | AuthenticationError>;
}
