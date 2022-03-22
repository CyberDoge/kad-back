import {ContextUser} from 'src/types/ContextUser';
import {MessageRequest} from 'src/types/request';

export interface ChatController {
    receiveMessage(route: string, message: MessageRequest, user: ContextUser)
}