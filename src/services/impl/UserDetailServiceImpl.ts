import {inject, injectable} from 'inversify';
import {isNil, omitBy} from 'lodash';
import {TYPES} from 'src/ioc';
import {UserDetail, UserDetailType, UserType} from 'src/models/interfaces';
import {UserDetailService} from 'src/services/interfaces';

@injectable()
export class UserDetailServiceImpl implements UserDetailService {
    private userDetail: UserDetail;

    constructor(@inject(TYPES.UserDetail) userDetail: UserDetail) {
        this.userDetail = userDetail;
    }

    createUserDetails(userId: UserType['id']) {
        this.userDetail.create({
            userId,
            emails: [],
            phones: [],
            firstName: '',
            secondName: ''
        });
    }

    async updateUserDetails(userId: UserType['id'], userDetail: Omit<UserDetailType, 'id' | 'userId'>) {
        const userDetailByUserId = await this.userDetail.findByUserId(userId);

        const updatedUser = {...userDetailByUserId, ...omitBy(userDetail, isNil)} as UserDetailType;

        this.userDetail.update(updatedUser);
    }

}
