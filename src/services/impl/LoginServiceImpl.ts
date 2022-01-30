import {AuthenticationError} from 'apollo-server-express';
import {inject, injectable} from 'inversify';
import {TYPES} from 'src/iocTypes';
import {Auth, User} from 'src/models/interfaces';
import {LoginCredentials} from 'src/types/request';
import {LoginResponse} from 'src/types/responses';
import {provideAuthToken} from 'src/utils/authTokenProvider';
import {LoginService} from '../interfaces';

@injectable()
export class LoginServiceImpl implements LoginService {
    private auth: Auth;
    private user: User;

    constructor(@inject(TYPES.Auth) auth: Auth, @inject(TYPES.User) user: User) {
        this.auth = auth;
        this.user = user;
    }

    async validateCredentialsInput(loginCredentials: LoginCredentials): Promise<boolean> {
        return !!(loginCredentials.email && loginCredentials.password);
    }


    async login(loginCredentials: LoginCredentials): Promise<LoginResponse | AuthenticationError> {
        const validation = await this.validateCredentialsInput(loginCredentials);
        if (validation) {
            return new AuthenticationError('invalid credentials input');
        }
        const user = await this.user.findByEmail(loginCredentials.email);
        if (!user || user.password !== loginCredentials.password) {
            return new AuthenticationError('invalid credentials');
        }
        const token = provideAuthToken();
        this.auth.setUserIdByAuthorization(token, user.id);

        return {token, user};
    }

}
