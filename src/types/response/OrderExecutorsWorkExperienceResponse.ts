import {CurrentUserResponse} from 'src/types/response/CurrentUserResponse';

export type OrderExecutorsWorkExperienceResponse = {
    workExperienceArray: CurrentUserResponse['workExperienceArray']
    id: string
}[];
