import {ValidationError} from 'apollo-server-errors';
import {ModelContext} from 'src/context/interfaces/ModelContext';

import {Auth, Role, User} from 'src/models/interfaces';
import {RegisterCredentials} from 'src/types/request';
import {LoginResponse} from 'src/types/responses';
import {provideAuthToken} from 'src/utils/authTokenProvider';
import {RegistrationService} from '../interfaces';

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
            email: credentials.email,
            password: credentials.password,
            roles: [(await this.role.getByRoleName('commonUser'))]
        };

        const user = await this.user.save(newUser);
        const token = provideAuthToken();
        this.auth.setUserIdByAuthorization(token, user.id);

        return {
            token,
            user
        };
    }


}
