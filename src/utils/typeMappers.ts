import {UserDetailType, UserType} from 'src/models/interfaces';
import {ContextUser} from 'src/types/ContextUser';
import {UserDetailsRequest} from 'src/types/request';
import {CurrentUserResponse} from 'src/types/response';

export function mapUserDetailToCurrentUserResponse(user: Partial<UserDetailType> & UserType): CurrentUserResponse {
    return {
        id: user.id,
        roles: user.roles.map((r) => r.roleName),
        fullName: [user.firstName, user.secondName, user.thirdName].filter(Boolean).join(' '),
        avatarUrl: user.avatarUrl,
        primaryEmail: user.email,
        emails: user.emails || [],
        phones: user.phones || [],
    };
}

export function mapUserDetailRequestToUserDetail(userDetailsRequest: UserDetailsRequest)
    : Omit<UserDetailType, 'id' | 'userId'> {
    return {
        firstName: userDetailsRequest.firstName,
        secondName: userDetailsRequest.secondName,
        thirdName: userDetailsRequest.thirdName,
        avatarUrl: userDetailsRequest.avatarUrl,
        phones: userDetailsRequest.phones || [],
        emails: userDetailsRequest.emails || []
    };
}

export function mapUserToContextUser(user: UserType): ContextUser {
    return {
        id: user.id,
        roles: user.roles.map(r => r.roleName)
    };
}
