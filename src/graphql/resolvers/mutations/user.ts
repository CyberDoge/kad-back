import {AuthenticationError} from 'apollo-server-express';
import {Context} from 'src/types/Context';
import {UserDetailsRequest} from 'src/types/request';
import {UserInteractor} from 'src/useCaseInteractors/interfaces';
import {mapUserDetailRequestToUserDetail} from 'src/utils/typeMappers';

export const user = (userInteractor: UserInteractor) =>
    ({
        updateCurrentUser:
            async (_, {userDetailsRequest}: { userDetailsRequest: UserDetailsRequest }, {user}: Context) => {
                if (!user) {
                    throw new AuthenticationError('not authenticated');
                }

                userInteractor.updateUserDetail(user.id, mapUserDetailRequestToUserDetail(userDetailsRequest));
            },
    });
