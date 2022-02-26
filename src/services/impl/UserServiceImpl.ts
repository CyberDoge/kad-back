import {inject, injectable} from 'inversify';
import {TYPES} from 'src/ioc';
import {Role, User, UserDetail, UserDetailType, UserType} from 'src/models/interfaces';
import {EventService, UserService} from '../interfaces';

@injectable()
export class UserServiceImpl implements UserService {
    private userDetail: UserDetail;
    private user: User;
    private role: Role;
    private eventService: EventService;

    constructor(
        @inject(TYPES.UserDetail) userDetail: UserDetail,
        @inject(TYPES.User) user: User,
        @inject(TYPES.Role) role: Role,
        @inject(TYPES.EventService) eventService: EventService
    ) {
        this.userDetail = userDetail;
        this.user = user;
        this.role = role;
        this.eventService = eventService;
    }

    updateUser(updatedUser: UserType): Promise<UserType> {
        return this.user.update(updatedUser);
    }

    async getAllUserDataById(userId: string): Promise<UserType & Partial<UserDetailType>> {
        const user = await this.findUserById(userId);
        if (!user) {
            throw new Error(`User with id = ${userId} is not found`);
        }
        const userDetails = await this.userDetail.findByUserId(userId);

        return {...userDetails, ...user};

    }

    async findUserById(userId: string): Promise<UserType | undefined> {
        return await this.user.findById(userId);
    }

}
