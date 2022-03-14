import {AuthenticationError} from 'apollo-server-express';
import {inject, injectable} from 'inversify';
import {TYPES} from 'src/ioc';
import {User, UserType} from 'src/models/interfaces';
import {LoginCredentials} from 'src/types/request';
import {LoginService} from '../interfaces';

@injectable()
export class LoginServiceImpl implements LoginService {
    private user: User;

    constructor(@inject(TYPES.User) user: User) {
        this.user = user;
    }


    async login(loginCredentials: LoginCredentials): Promise<UserType> {
        const user = await this.user.findByEmail(loginCredentials.email);
        if (!user || user.password !== loginCredentials.password) {
            throw new AuthenticationError('invalid credentials');
        }

        return user;
    }

}
