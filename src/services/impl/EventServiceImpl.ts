import {inject, injectable} from 'inversify';
import {TYPES} from 'src/ioc';
import {NewlyContractType, PlatformEvent} from 'src/models/interfaces';
import {EventOrderService} from '../interfaces';

@injectable()
export class EventServiceImpl implements EventOrderService {
    private platformEvent: PlatformEvent;

    constructor(@inject<PlatformEvent>(TYPES.PlatformEvent) platformEvent: PlatformEvent) {
        this.platformEvent = platformEvent;
    }

    async userEnrolledToNewlyContract(newlyContract: NewlyContractType) {
        return this.platformEvent.saveEventToQueue({
            checked: false,
            title: 'На вашу заявку отозвался новый исполнитель',
            ownerId: newlyContract.customerId,
            description: `Проверьте свою заявку ${newlyContract.order.title}`
        });
    }

}
