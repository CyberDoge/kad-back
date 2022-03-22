import {MessageType} from 'src/models/interfaces';

export interface MessageService {
    saveMessage(message: Omit<MessageType, 'id'>): Promise<MessageType>;

    getMessageById(messageId: MessageType['id']): Promise<MessageType | undefined>;
}
