import {RegisterCredentials} from 'src/types/request';
import {ValidationError} from 'apollo-server-errors';
import {LoginResponse} from 'src/types/responses';

export interface RegistrationService {
    registration(credentials: RegisterCredentials): Promise<ValidationError | LoginResponse>;

}
