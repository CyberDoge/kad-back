import {ValidationError} from 'apollo-server-errors';

import {Auth, Role, User} from 'src/models/interfaces';
import {RegistrationService} from './RegistrationService';
import {RegisterCredentials} from 'src/types/request';
import {LoginResponse} from 'src/types/responses';
import {provideAuthToken} from 'src/utils/authTokenProvider';
import {ModelContext} from 'src/context/ModelContext';

export class RegistrationServiceImpl implements RegistrationService {
    private auth: Auth;
    private user: User;
    private role: Role;

    constructor(context: ModelContext) {
        this.auth = context.auth;
        this.user = context.user;
        this.role = context.role;
    }

    async registration(credentials: RegisterCredentials): Promise<LoginResponse | ValidationError> {
        if (await this.user.findByEmail(credentials.email)) {
            return new ValidationError('user with suck email is already exist');
        }
        const newUser = {
            _id: `user${Math.random()}`,
            email: credentials.email,
            password: credentials.password,
            roles: [(await this.role.getByRoleName('commonUser'))]
        };

        this.user.create(newUser);
        const token = provideAuthToken();
        this.auth.setUserIdByAuthorization(token, newUser._id);
        return {
            token,
            userId: newUser._id
        };
    }


}
