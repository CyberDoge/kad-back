import {ValidationError} from 'apollo-server-errors';
import {inject, injectable} from 'inversify';
import {isNil, omitBy, remove} from 'lodash';
import {TYPES} from 'src/ioc';
import {Role, User, UserDetail, UserDetailType, UserType} from 'src/models/interfaces';
import {UpdateUserInfo} from 'src/types/request/UpdateUserInfo';
import {UserService} from '../interfaces';

@injectable()
export class UserServiceImpl implements UserService {
    private userDetail: UserDetail;
    private user: User;
    private role: Role;

    constructor(
        @inject(TYPES.UserDetail) userDetail: UserDetail, @inject(TYPES.User) user: User, @inject(TYPES.Role) role: Role
    ) {
        this.userDetail = userDetail;
        this.user = user;
        this.role = role;
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

    async updateUserById(userId: string, updateUserInfo: UpdateUserInfo) {
        const userDetail = await this.userDetail.findByUserId(userId);
        if (!userDetail) {
            if (!updateUserInfo.firstName || !updateUserInfo.secondName) {
                throw new ValidationError(
                    'First name and second name must by filled if updating not created user details'
                );
            }
            this.userDetail.create({
                userId,
                phones: updateUserInfo.phones || [],
                emails: updateUserInfo.emails || [],
                firstName: updateUserInfo.firstName,
                secondName: updateUserInfo.secondName,
                ...updateUserInfo
            });

            return;
        }
        const updatedUser = {...userDetail, ...omitBy(updateUserInfo, isNil)} as UserDetailType;
        this.userDetail.update(updatedUser);

        this.updateUserRoleIfWasAnon(userId);

    }

    private async updateUserRoleIfWasAnon(userId: string) {
        const user = (await this.user.findById(userId));
        if (!user) {
            throw new Error(`No user with id = ${userId}`);
        }
        if (!user.roles.some(({roleName}) => roleName === 'ANON')) {
            return;
        }
        remove(user.roles, (r) => r.roleName === 'ANON');
        user.roles.push(await this.role.getByRoleName('COMMON_USER'));
        this.user.update(user);
    }

}
