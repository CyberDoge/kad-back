import {codeUser} from 'src/helpers/jwtHelper';
import {RegisterCredentials} from 'src/types/request/RegisterCredentials';
import {RegistrationInteractor} from 'src/useCaseInteractors/interfaces';
import {mapUserToContextUser} from 'src/utils/typeMappers';

export const registration = (registrationInteractor: RegistrationInteractor) =>
    async (_, {credentials}: { credentials: RegisterCredentials }) => {
        return codeUser(mapUserToContextUser(await registrationInteractor.registration(credentials)));
    };
