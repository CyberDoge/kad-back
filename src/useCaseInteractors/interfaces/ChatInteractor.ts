import {MessageType, UserType} from 'src/models/interfaces';

export type Message = {
    text: string
    ownerId: UserType['id']
}

export interface ChatInteractor {
    receiveMessage(message: Message);

    markMessageAsRead(messageId: MessageType['id'], userId: UserType['id']);
}
