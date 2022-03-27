import {CurrentUserResponse} from './CurrentUserResponse';

export type OrderExecutorsWorkExperienceResponse = {
    workExperienceArray: CurrentUserResponse['workExperienceArray']
    id: string
}[];
