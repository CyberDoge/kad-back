import {ApolloError} from 'apollo-server-express';
import {LoginCredentials} from 'types/request/LoginCredentials';
import {LoginServiceImpl} from 'services/LoginServiceImpl';

// todo перенести в замыкание
const loginService = new LoginServiceImpl();

export default async (_, credentials: LoginCredentials) => {
    if (!(await loginService.checkCredentials(credentials))) {
        return new ApolloError('invalid credentials');
    }
    return await loginService.login(credentials);
};
