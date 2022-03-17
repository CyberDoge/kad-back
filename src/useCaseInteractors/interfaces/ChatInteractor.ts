import {MessageType, UserType} from 'src/models/interfaces';

export interface ChatInteractor {
    receiveMessageAndSendToAllMembers(message: MessageType);

    markMessageAsRead(messageId: MessageType['id'], userId: UserType['id']);
}
