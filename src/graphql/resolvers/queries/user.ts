import {internalization} from 'src/internalization';
import {UserService} from 'src/services/interfaces';
import {Context} from 'src/types/Context';
import {CurrentUserResponse} from 'src/types/response';
import {mapUserDetailToCurrentUserResponse} from 'src/utils/typeMappers';

export const user = (userService: UserService) =>
    ({
        currentUser: async (_, _1, {user}: Context): Promise<CurrentUserResponse> => {
            const userData = await userService.getAllUserDataById(user.id);
            if (!userData) {
                throw new Error(internalization.translate('Not valid id of current user'));
            }

            return mapUserDetailToCurrentUserResponse(userData);
        },
    });
