import {UserType} from 'src/models/interfaces';

export type UserCompetenceType = {
    id: string,
    userId: string,
    workExperienceArray?: WorkExperience[],
    pdfResume?: string
}

type WorkExperience = {
    placeOfWork: string,
    position: string,
    dateFrom: string,
    dateTo: string,
    description?: string
}

export interface UserCompetence {
    create(userCompetence: Omit<UserCompetenceType, 'id'>): Promise<UserCompetenceType>;

    updateByUserId(userId: UserType['id'], userCompetence: Partial<UserCompetenceType>)
        : Promise<UserCompetenceType>;

    getUserCompetenceByUserId(userId: UserType['id']): Promise<UserCompetenceType | undefined>;

    getCompetenceById(id: UserCompetenceType['id']): Promise<UserCompetenceType | undefined>;

}
