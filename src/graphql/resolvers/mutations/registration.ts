import {RegistrationService} from 'src/services/interfaces/RegistrationService';
import {RegisterCredentials} from 'src/types/request/RegisterCredentials';

export const registration = (registrationService: RegistrationService) =>
    (_, {credentials}: { credentials: RegisterCredentials }) => {
        return registrationService.registration(credentials);
    };
