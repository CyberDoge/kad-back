import {inject, injectable} from 'inversify';
import {remove} from 'lodash';
import {TYPES} from 'src/ioc';
import {OrderType, Role, UserCompetenceType, UserDetail, UserDetailType, UserType} from 'src/models/interfaces';
import {EventService, UserCompetenceService, UserOperatingDataService, UserService} from 'src/services/interfaces';
import {UserInteractor} from 'src/useCaseInteractors/interfaces';

@injectable()
export class UserInteractorImpl implements UserInteractor {
    private userDetail: UserDetail;
    private userService: UserService;
    private userCompetenceService: UserCompetenceService;
    private userOperatingDataService: UserOperatingDataService;
    private eventService: EventService;
    private role: Role;

    constructor(
        @inject(TYPES.UserDetail) userDetail: UserDetail,
        @inject(TYPES.UserCompetenceService) userCompetenceService: UserCompetenceService,
        @inject(TYPES.UserOperatingDataService) userOperatingDataService: UserOperatingDataService,
        @inject(TYPES.EventService) eventService: EventService,
        @inject(TYPES.UserService) userService: UserService,
        @inject(TYPES.Role) role: Role,
    ) {
        this.userDetail = userDetail;
        this.userOperatingDataService = userOperatingDataService;
        this.userCompetenceService = userCompetenceService;
        this.eventService = eventService;
        this.userService = userService;
        this.role = role;
    }

    addOrderToFavourite(userId: UserType['id'], orderId: OrderType['id']) {
        this.userOperatingDataService.addFavoriteOrderByUserId(userId, orderId);
    }

    async updateUserDetail(userId: UserType['id'], userDetail: Omit<UserDetailType, 'id' | 'userId'>) {
        const updatedUserDetails = await this.userDetail.findByUserId(userId);
        if (!updatedUserDetails) {
            throw new Error(`No such UserDetail with userId = ${userId}`);
        }
        this.userDetail.update({...updatedUserDetails, ...userDetail});
        this.updateUserRoleIfWasAnon(userId);
        this.eventService.createCommonEvent({
            type: 'userDataEvent',
            ownerId: userId,
            title: '???????? ???????????? ???????????? ??????????????????'
        });
    }

    updateUserCompetence(userId: UserType['id'], userCompetence: Omit<UserCompetenceType, 'id' | 'userId'>) {
        this.userCompetenceService.updateUserCompetence(userId, userCompetence);
    }

    private async updateUserRoleIfWasAnon(userId: string) {
        const user = (await this.userService.findUserById(userId));
        if (!user) {
            throw new Error(`No user with id = ${userId}`);
        }
        if (!user.roles.some(({roleName}) => roleName === 'ANON')) {
            return;
        }
        remove(user.roles, (r) => r.roleName === 'ANON');
        user.roles.push(await this.role.getByRoleName('COMMON_USER'));
        this.userService.updateUser(user);
    }

}
