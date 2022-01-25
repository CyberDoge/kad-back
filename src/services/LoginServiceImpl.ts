import {LoginService} from 'src/services/LoginService';
import {LoginCredentials} from 'src/types/request/LoginCredentials';
import {Auth} from 'src/models/interfaces/Auth';
import {InMemoryAuth} from 'src/models/impl/InMemoryAuth';
import {User} from 'src/models/interfaces/User';
import {InMemoryUser} from 'src/models/impl/InMemoryUser';
import {LoginResponse} from 'src/types/responses/LoginResponse';
import {ApolloError} from 'apollo-server-express';

export class LoginServiceImpl implements LoginService {
    private auth: Auth;
    private user: User;

    constructor() {
        this.auth = new InMemoryAuth();
        this.user = new InMemoryUser();
    }

    async checkCredentials(loginCredentials: LoginCredentials): Promise<boolean> {
        return !!(loginCredentials.email && loginCredentials.password);
    }

    async login(loginCredentials: LoginCredentials): Promise<LoginResponse> {
        const user = await this.user.findByEmail(loginCredentials.email);
        if (user.password !== loginCredentials.password) {
            return {
                error: new ApolloError('invalid credentials')
            };
        }

        this.auth.setUserIdByAuthorization('todo', user._id);
        return {token: 'not a random token '};
    }

}
