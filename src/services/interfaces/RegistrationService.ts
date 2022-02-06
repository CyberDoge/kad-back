import {ValidationError} from 'apollo-server-errors';
import {RegisterCredentials} from 'src/types/request';

export interface RegistrationService {
    registration(credentials: RegisterCredentials): Promise<ValidationError | string>;

}
