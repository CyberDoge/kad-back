import {COMMON_ORDERS_ARRAY_LENGTH} from 'src/consts';
import {OrderFilterType, UserDetailType, UserType} from 'src/models/interfaces';
import {ContextUser} from 'src/types/ContextUser';
import {OrderFilter, UserDetailsRequest} from 'src/types/request';
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

export const mapOrderFilterRequestToOrderFilterType = (filter?: OrderFilter): OrderFilterType => {
    if (!filter) {
        return {
            start: 0,
            count: COMMON_ORDERS_ARRAY_LENGTH,
            title: undefined,
            description: undefined,
            priceFrom: undefined,
            priceTo: undefined,
            dateFrom: undefined,
            dateTo: undefined,
        };
    }

    return {
        start: filter.start,
        count: filter.count,
        title: filter.title,
        description: filter.description,
        priceFrom: filter.priceFrom,
        priceTo: filter.priceTo,
        dateFrom: filter.dateFrom ? new Date(filter.dateFrom) : undefined,
        dateTo: filter.dateTo ? new Date(filter.dateTo) : undefined,
    };


};
