import {AuthenticationError} from 'apollo-server-express';
import {UserService} from 'src/services/interfaces';
import {Context} from 'src/types/Context';
import {CurrentUser} from 'src/types/response';
import {mapUserDetailTypeToCurrentUser} from 'src/utils/typeMappers';

export const user = (userService: UserService) =>
    ({
        currentUser: async (_, _1, {user}: Context): Promise<CurrentUser> => {
            if (!user) {
                throw new AuthenticationError('not authenticated');
            }
            const userData = await userService.getAllUserDataById(user.id);

            return mapUserDetailTypeToCurrentUser(userData);
        },
    });
