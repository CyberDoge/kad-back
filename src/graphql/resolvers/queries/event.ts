import {EventService} from 'src/services/interfaces';
import {Context} from 'src/types/Context';

export const event = (eventService: EventService) =>
    ({
        events: async (_, {count}: { count?: number }, {user}: Context) => {
            return await eventService.getLastEventsByUserId(user.id, count);
        },
    });
