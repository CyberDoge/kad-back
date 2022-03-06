import {inject, injectable} from 'inversify';
import {TYPES} from 'src/ioc';
import {UserType} from 'src/models/interfaces';
import {
    RegistrationService,
    UserCompetenceService,
    UserDetailService,
    UserOperatingDataService
} from 'src/services/interfaces';
import {RegisterCredentials} from 'src/types/request';
import {RegistrationInteractor} from 'src/useCaseInteractors/interfaces';

@injectable()
export class RegistrationInteractorImpl implements RegistrationInteractor {
    private userDetailService: UserDetailService;
    private userOperatingDataService: UserOperatingDataService;
    private userCompetenceService: UserCompetenceService;
    private registrationService: RegistrationService;

    constructor(
        @inject(TYPES.UserDetailService) userDetailService: UserDetailService,
        @inject(TYPES.UserOperatingDataService) userOperatingDataService: UserOperatingDataService,
        @inject(TYPES.RegistrationService) registrationService: RegistrationService,
        @inject(TYPES.UserCompetenceService) userCompetenceService: UserCompetenceService,
    ) {
        this.userDetailService = userDetailService;
        this.userOperatingDataService = userOperatingDataService;
        this.registrationService = registrationService;
        this.userCompetenceService = userCompetenceService;
    }

    async registration(credentials: RegisterCredentials): Promise<UserType> {
        const user = await this.registrationService.registration(credentials);
        this.userDetailService.createUserDetails(user.id);
        this.userOperatingDataService.createUserOperatingData(user.id);
        this.userCompetenceService.createUserCompetence(user.id);

        return user;
    }


}
