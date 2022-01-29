import {RegisterCredentials} from 'src/types/request/RegisterCredentials';
import {RegistrationService} from 'src/services/registrationServices/RegistrationService';

export const registration = (registrationService: RegistrationService) =>
    (_, {credentials}: { credentials: RegisterCredentials }) => {
        return registrationService.registration(credentials);
    };
