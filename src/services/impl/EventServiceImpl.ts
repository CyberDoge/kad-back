import {inject, injectable} from 'inversify';
import {TYPES} from 'src/ioc';
import {NewlyContractType, PlatformEvent, PlatformEventType, UserType} from 'src/models/interfaces';
import {EventOrderService, EventService} from '../interfaces';

@injectable()
export class EventServiceImpl implements EventOrderService, EventService {
    private platformEvent: PlatformEvent;

    constructor(@inject<PlatformEvent>(TYPES.PlatformEvent) platformEvent: PlatformEvent) {
        this.platformEvent = platformEvent;
    }

    createCommonEvent(platformEvent: Omit<PlatformEventType, 'id' | 'checked' | 'date'>) {
        this.platformEvent.saveEventToQueue({
            ...platformEvent,
            checked: false
        });
    }

    markEventsAsChecked(ids: PlatformEventType['id'][]) {
        this.platformEvent.markEventsAsChecked(ids);
    }

    getLastEventsByUserId(userId: UserType['id'], count = 100): Promise<PlatformEventType[]> {
        const normalizedCount = Math.min(count, 100);

        return this.platformEvent.getLastEventsByUserId(userId, normalizedCount);
    }

    async userEnrolledToNewlyContract(newlyContract: NewlyContractType) {
        return this.platformEvent.saveEventToQueue({
            checked: false,
            title: 'На вашу заявку отозвался новый исполнитель',
            ownerId: newlyContract.customerId,
            description: `Проверьте свою заявку ${newlyContract.order.title}`,
            type: 'orderEvent'
        });
    }

    userUnEnrolledToNewlyContract(newlyContract: NewlyContractType): Promise<string> {
        return this.platformEvent.saveEventToQueue({
            checked: false,
            title: 'Исполнитель отказался от заявки',
            ownerId: newlyContract.customerId,
            description: `Всего заявителей - ${newlyContract.potentialExecutorIds.length}`,
            type: 'orderEvent'
        });
    }

}
