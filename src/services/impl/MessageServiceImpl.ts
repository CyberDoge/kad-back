import {inject, injectable} from 'inversify';
import {TYPES} from 'src/ioc';
import {Message, MessageType} from 'src/models/interfaces';
import {MessageService} from 'src/services/interfaces';

@injectable()
export class MessageServiceImpl implements MessageService {
    constructor(@inject(TYPES.Message) private message: Message) {
        this.message = message;
    }

    getMessageById(messageId: MessageType['id']): Promise<MessageType | undefined> {
        return this.message.getMessagesByIds([messageId])[0];
    }

    saveMessage(message: Omit<MessageType, 'id'>): Promise<MessageType> {
        return this.message.create(message);
    }

    getNMessagesByRoomId(roomId: MessageType['roomId'], count: number, from: number): Promise<MessageType[]> {
        return this.message.getNMessagesByRoomId(roomId);
    }

}