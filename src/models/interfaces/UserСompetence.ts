import {UserType} from 'src/models/interfaces/User';

export type UserCompetenceType = {
    id: string,
    userId: string,
    workExperienceArray?: WorkExperience[],
    pdfResume?: string
}

type WorkExperience = {
    placeOfWork: string,
    position: string,
    dateFrom: Date,
    dateTo?: Date,
    description?: string
}

export interface UserCompetence {
    create(userCompetence: Omit<UserCompetenceType, 'id'>): Promise<UserCompetenceType>;

    updateByUserId(userId: UserType['id'], userCompetence: Partial<UserCompetenceType>)
        : Promise<UserCompetenceType>;

    getUserCompetenceByUserId(userId: UserType['id']): Promise<UserCompetenceType | undefined>;

}
