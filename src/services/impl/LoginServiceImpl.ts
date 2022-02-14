import {AuthenticationError} from 'apollo-server-express';
import {inject, injectable} from 'inversify';
import {codeUser} from 'src/helpers/jwtHelper';
import {TYPES} from 'src/ioc';
import {User} from 'src/models/interfaces';
import {ContextUser} from 'src/types/ContextUser';
import {LoginCredentials} from 'src/types/request';
import {LoginService} from '../interfaces';

@injectable()
export class LoginServiceImpl implements LoginService {
    private user: User;

    constructor(@inject(TYPES.User) user: User) {
        this.user = user;
    }

    async validateCredentialsInput(loginCredentials: LoginCredentials): Promise<boolean> {
        return !!(loginCredentials.email && loginCredentials.password);
    }


    async login(loginCredentials: LoginCredentials): Promise<string | AuthenticationError> {
        const isValid = await this.validateCredentialsInput(loginCredentials);
        if (!isValid) {
            return new AuthenticationError('invalid credentials input');
        }
        const user = await this.user.findByEmail(loginCredentials.email);
        if (!user || user.password !== loginCredentials.password) {
            return new AuthenticationError('invalid credentials');
        }
        const contextUser: ContextUser = {
            id: user.id,
            roles: user.roles.map(r => r.roleName)
        };

        return codeUser(contextUser);
    }

}
