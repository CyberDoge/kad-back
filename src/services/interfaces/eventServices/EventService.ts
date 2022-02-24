import {PlatformEventType, UserType} from 'src/models/interfaces';

export interface EventService {
    getLastEventsByUserId(userId: UserType['id'], count?: number): Promise<PlatformEventType[]>;

    markEventsAsChecked(ids: PlatformEventType['id'][]);

    createCommonEvent(platformEvent: Omit<PlatformEventType, 'id' | 'checked' | 'date'>);
}
