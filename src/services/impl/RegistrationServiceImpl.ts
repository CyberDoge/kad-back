import {ValidationError} from 'apollo-server-errors';
import {inject, injectable} from 'inversify';
import {TYPES} from 'src/ioc';

import {Role, User, UserType} from 'src/models/interfaces';
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

    async registration(credentials: RegisterCredentials): Promise<UserType> {
        if (await this.user.findByEmail(credentials.email)) {
            throw new ValidationError('user with such email is already exist');
        }
        const roles = [await this.role.getByRoleName('ANON')];
        if (credentials.asCustomer) {
            roles.push(await this.role.getByRoleName('CUSTOMER'));
        }
        if (credentials.asExecutor) {
            roles.push(await this.role.getByRoleName('EXECUTOR'));
        }
        const newUser = {
            email: credentials.email,
            password: credentials.password,
            roles
        };

        return await this.user.save(newUser);
    }


}
