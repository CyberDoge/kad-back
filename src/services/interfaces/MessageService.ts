import {MessageType} from 'src/models/interfaces';

export interface MessageService {
    saveMessage(message: MessageType): Promise<MessageType>;

    getMessageById(messageId: MessageType['id']): Promise<MessageType | undefined>;
}
