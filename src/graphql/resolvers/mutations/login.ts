import {codeUser} from 'src/helpers/jwtHelper';
import {LoginService} from 'src/services/interfaces/LoginService';
import {LoginCredentials} from 'src/types/request/LoginCredentials';
import {mapUserToContextUser} from 'src/utils/typeMappers';

export const login = (loginService: LoginService) => async (_, {credentials}: { credentials: LoginCredentials }) => {
    return await codeUser(mapUserToContextUser(await loginService.login(credentials)));
};
