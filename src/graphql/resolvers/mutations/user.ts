import {AuthenticationError} from 'apollo-server-express';
import {UserService} from 'src/services/interfaces';
import {Context} from 'src/types/Context';
import {UpdateUserInfo} from 'src/types/request/UpdateUserInfo';

export const user = (userService: UserService) =>
    ({
        updateCurrentUser: async (_, {updateUserInfo}: { updateUserInfo: UpdateUserInfo }, {user}: Context) => {
            if (!user) {
                throw new AuthenticationError('not authenticated');
            }

            userService.updateUserById(user.id, updateUserInfo);
        },
    });
