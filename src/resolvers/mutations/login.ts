import {LoginCredentials} from 'src/types/request/LoginCredentials';
import {LoginService} from 'src/services/loginServices/LoginService';

export default (loginService: LoginService) => async (_, {credentials}: { credentials: LoginCredentials }) => {
    return await loginService.login(credentials);
};
