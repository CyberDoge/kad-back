import {UserType} from 'src/models/interfaces';
import {RegisterCredentials} from 'src/types/request';

export interface RegistrationService {
    registration(credentials: RegisterCredentials): Promise<UserType>;

}
