import {ApolloError} from 'apollo-server-express';
import {LoginCredentials} from 'src/types/request/LoginCredentials';
import {LoginService} from 'src/services/loginServices/LoginService';

export default (loginService: LoginService) => async (_, {credentials}: { credentials: LoginCredentials }) => {
    if (!(await loginService.checkCredentials(credentials))) {
        return new ApolloError('invalid credentials');
    }
    return await loginService.login(credentials);
};
