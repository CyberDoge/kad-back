import {inject, injectable} from 'inversify';
import {TYPES} from 'src/ioc';
import {UserType} from 'src/models/interfaces';
import {RegistrationService, UserDetailService, UserOperatingDataService} from 'src/services/interfaces';
import {RegisterCredentials} from 'src/types/request';
import {RegistrationInteractor} from 'src/useCaseInteractors/interfaces';

@injectable()
export class RegistrationInteractorImpl implements RegistrationInteractor {
    private userDetailService: UserDetailService;
    private userOperatingDataService: UserOperatingDataService;
    private registrationService: RegistrationService;

    constructor(
        @inject(TYPES.UserDetailService) userDetailService: UserDetailService,
        @inject(TYPES.UserOperatingDataService) userOperatingDataService: UserOperatingDataService,
        @inject(TYPES.RegistrationService) registrationService: RegistrationService,
    ) {
        this.userDetailService = userDetailService;
        this.userOperatingDataService = userOperatingDataService;
        this.registrationService = registrationService;
    }

    async registration(credentials: RegisterCredentials): Promise<UserType> {
        const user = await this.registrationService.registration(credentials);
        this.userDetailService.createUserDetails(user.id);
        this.userOperatingDataService.createUserOperatingData(user.id);

        return user;
    }


}
