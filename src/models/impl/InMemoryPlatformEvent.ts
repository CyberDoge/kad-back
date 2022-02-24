import {injectable} from 'inversify';
import {v4 as uuid} from 'uuid';
import {PlatformEvent, PlatformEventType, UserType} from '../interfaces';

@injectable()
export class InMemoryPlatformEvent implements PlatformEvent {
    private events: PlatformEventType[];

    constructor() {
        this.events = [];
    }

    async getLastEventsByUserId(ownerId: UserType['id'], count: number): Promise<PlatformEventType[]> {
        return this.events.filter(event => event.ownerId === ownerId && !event.checked).slice(0, count);
    }

    markEventsAsChecked(ids: PlatformEventType['id'][]) {
        this.events.filter((e) => ids.includes(e.id)).forEach(e => e.checked = true);
    }

    async saveEventToQueue(event: Omit<PlatformEventType, 'date' | 'id'>): Promise<PlatformEventType['id']> {

        const newEvent = {
            ...event,
            id: uuid(),
            date: new Date()
        };
        this.events.push(newEvent);

        return newEvent.id;
    }

}
