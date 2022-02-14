import {UserType} from 'src/models/interfaces/User';

export type PlatformEventType = {
    id: string
    title: string,
    description?: string,
    date: Date,
    checked: boolean,
    ownerId: UserType['id']
}


export interface PlatformEvent {
    saveEventToQueue(event: Omit<PlatformEventType, 'date' | 'id'>): Promise<PlatformEventType['id']>;

    getLastEventsByUserId(ownerId: UserType['id'], count?: number): Promise<PlatformEventType[]>;

    markEventsAsChecked(ownerId: UserType['id'], ids: PlatformEventType['id'][]);
}

