import {UserCompetenceType, UserType} from 'src/models/interfaces';

export interface UserCompetenceService {
    updateUserCompetence(userId: UserType['id'], userCompetence: Partial<UserCompetenceType>);

    createUserCompetence(userId: UserType['id']);

    getUserCompetenceByUserId(userId: UserType['id']): Promise<UserCompetenceType | undefined>;

    getCompetenceById(id: UserCompetenceType['id']): Promise<UserCompetenceType | undefined>

}
