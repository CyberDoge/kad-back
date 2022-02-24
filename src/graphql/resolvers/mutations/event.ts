import {EventService} from 'src/services/interfaces';

export const event = (eventService: EventService) =>
    ({
        checkEvents: (_, {eventIds}: { eventIds: string[] }) => {
            eventService.markEventsAsChecked(eventIds);
        }
    });
