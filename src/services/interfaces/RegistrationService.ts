import {ValidationError} from 'apollo-server-errors';
import {RegisterCredentials} from 'src/types/request';
import {LoginResponse} from 'src/types/responses';

export interface RegistrationService {
    registration(credentials: RegisterCredentials): Promise<ValidationError | LoginResponse>;

}
