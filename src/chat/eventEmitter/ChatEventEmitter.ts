import {MessageResponse} from 'src/types/response';
import {Route} from '../route';

export type Events = {
    sendNewMessageToUsers: [userIds: string[], message: MessageResponse],
    sendOldMessagesToUser: [route: Route, userId: string, messages: MessageResponse[]]
}

export interface ChatEventEmitter {
    emmit<EVENT extends keyof Events>(event: EVENT, ...args: Events[EVENT]);

    setEventListener<EVENT extends keyof Events>(
        event: EVENT, listener: (...args: Events[EVENT]) => void
    );
}
