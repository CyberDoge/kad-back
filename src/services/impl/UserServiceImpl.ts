import {inject, injectable} from 'inversify';
import {TYPES} from 'src/ioc';
import {
    Role,
    User,
    UserCompetence,
    UserCompetenceType,
    UserDetail,
    UserDetailType,
    UserType
} from 'src/models/interfaces';
import {EventService, UserService} from '../interfaces';

@injectable()
export class UserServiceImpl implements UserService {
    private userDetail: UserDetail;
    private userCompetence: UserCompetence;
    private user: User;
    private role: Role;
    private eventService: EventService;

    constructor(
        @inject(TYPES.UserDetail) userDetail: UserDetail,
        @inject(TYPES.UserCompetence) userCompetence: UserCompetence,
        @inject(TYPES.User) user: User,
        @inject(TYPES.Role) role: Role,
        @inject(TYPES.EventService) eventService: EventService
    ) {
        this.userDetail = userDetail;
        this.userCompetence = userCompetence;
        this.user = user;
        this.role = role;
        this.eventService = eventService;
    }

    updateUser(updatedUser: UserType): Promise<UserType> {
        return this.user.update(updatedUser);
    }

    async getAllUserDataById(userId: string): Promise<UserType & Partial<UserDetailType & UserCompetenceType> | null> {
        const user = await this.findUserById(userId);
        if (!user) {
            return null;
        }
        const userDetails = await this.userDetail.findByUserId(userId);
        const competence = await this.userCompetence.getUserCompetenceByUserId(userId);

        return {...userDetails, ...user, ...competence};

    }

    async findUserById(userId: string): Promise<UserType | undefined> {
        return await this.user.findById(userId);
    }

}
