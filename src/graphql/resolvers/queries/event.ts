import {AuthenticationError} from 'apollo-server-express';
import {EventService} from 'src/services/interfaces';
import {Context} from 'src/types/Context';

export const event = (eventService: EventService) =>
    ({
        events: async (_, {count}: { count?: number }, {user}: Context) => {
            if (!user) {
                throw new AuthenticationError('not authenticated');
            }
            
            return await eventService.getLastEventsByUserId(user.id, count);
        },
    });
