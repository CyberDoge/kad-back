import {inject, injectable} from 'inversify';
import {TYPES} from 'src/ioc';
import {UserCompetence, UserCompetenceType, UserType} from 'src/models/interfaces';
import {UserCompetenceService} from '../interfaces';

@injectable()
export class UserCompetenceServiceImpl implements UserCompetenceService {
    private userCompetence: UserCompetence;

    constructor(
        @inject(TYPES.UserCompetence) userCompetence: UserCompetence,
    ) {
        this.userCompetence = userCompetence;
    }

    createUserCompetence(userId: UserType['id']) {
        this.userCompetence.create({
            userId
        });
    }

    getUserCompetenceByUserId(userId: UserType['id']): Promise<UserCompetenceType | undefined> {
        return this.userCompetence.getUserCompetenceByUserId(userId);
    }

    updateUserCompetence(userId: UserType['id'], userCompetence: Partial<UserCompetenceType>) {
        this.userCompetence.updateByUserId(userId, userCompetence);
    }

    getCompetenceById(id: UserCompetenceType["id"]): Promise<UserCompetenceType | undefined> {
        return this.userCompetence.getCompetenceById(id);
    }

}
