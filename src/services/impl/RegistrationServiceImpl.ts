import {ValidationError} from 'apollo-server-errors';
import {inject, injectable} from 'inversify';
import {codeUser} from 'src/helpers/jwtHelper';
import {TYPES} from 'src/iocTypes';

import {Role, User} from 'src/models/interfaces';
import {RegisterCredentials} from 'src/types/request';
import {RegistrationService} from '../interfaces';

@injectable()
export class RegistrationServiceImpl implements RegistrationService {
    private user: User;
    private role: Role;

    constructor(
        @inject(TYPES.User) user: User,
        @inject(TYPES.Role) role: Role,
    ) {
        this.user = user;
        this.role = role;
    }

    async registration(credentials: RegisterCredentials): Promise<string | ValidationError> {
        if (await this.user.findByEmail(credentials.email)) {
            return new ValidationError('user with suck email is already exist');
        }
        const newUser = {
            email: credentials.email,
            password: credentials.password,
            roles: [(await this.role.getByRoleName('COMMON_USER'))]
        };

        const user = await this.user.save(newUser);
    
        return codeUser({
            id: user.id,
            roles: user.roles.map(r => r.roleName)
        });
    }


}
