import {LoginCredentials} from 'src/types/request/LoginCredentials';
import {LoginService} from 'src/services/interfaces/LoginService';

export const login = (loginService: LoginService) => async (_, {credentials}: { credentials: LoginCredentials }) => {
    return await loginService.login(credentials);
};
