import {AuthenticationError} from 'apollo-server-express';
import {Auth, User} from 'src/models/interfaces';
import {LoginCredentials} from 'src/types/request';
import {provideAuthToken} from 'src/utils/authTokenProvider';
import {ModelContext} from 'src/context/ModelContext';
import {LoginService} from './LoginService';
import {LoginResponse} from '../../types/responses';

export class LoginServiceImpl implements LoginService {
    private auth: Auth;
    private user: User;

    constructor(context: ModelContext) {
        this.auth = context.auth;
        this.user = context.user;
    }

    async checkCredentials(loginCredentials: LoginCredentials): Promise<boolean> {
        return !!(loginCredentials.email && loginCredentials.password);
    }

    async login(loginCredentials: LoginCredentials): Promise<LoginResponse | AuthenticationError> {
        const user = await this.user.findByEmail(loginCredentials.email);
        if (!user || user.password !== loginCredentials.password) {
            return new AuthenticationError('invalid credentials');
        }
        const token = provideAuthToken();
        this.auth.setUserIdByAuthorization(token, user._id);
        return {token, userId: user._id};
    }

}