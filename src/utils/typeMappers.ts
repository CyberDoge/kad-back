import {UserType} from 'src/models/interfaces';
import {UserDetailType} from 'src/models/interfaces/UserDetailData';
import {CurrentUser} from 'src/types/response';

export function mapUserDetailTypeToCurrentUser(user: Partial<UserDetailType> & UserType): CurrentUser {
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
