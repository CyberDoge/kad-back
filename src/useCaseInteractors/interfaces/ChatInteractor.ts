import {MessageType, UserType} from 'src/models/interfaces';

export type Message = {
    text: MessageType['text'],
    roomId: MessageType['id'],
    ownerId: UserType['id'],
}

export interface ChatInteractor {
    receiveMessageAndBroadcastToRoom(message: Message);

    markMessageAsRead(messageId: MessageType['id'], userId: UserType['id']);
}
