import {injectable} from 'inversify';
import {intersectionWith} from 'lodash';
import {Message, MessageType} from 'src/models/interfaces';
import {v4 as uuid} from 'uuid';
import {helper} from './dbHelper';

const h = helper('message.json');

@injectable()
export class InFileMessage implements Message {
    private messages: MessageType[];

    constructor() {
        this.messages = [];
        h.readFromFile().then(res => {
            this.messages = res as MessageType[];
        }).catch(() => {
            this.messages = [];
            h.writeToFile(this.messages);
        });
    }

    async getNMessagesByRoomId(roomId: MessageType['roomId'], from: number, count: number,): Promise<MessageType[]> {
        return this.messages.filter(m => m.roomId === roomId).slice(from, from + count);
    }

    async create(message: Omit<MessageType, 'id'>): Promise<MessageType> {
        const newMessage = {
            ...message,
            id: uuid()
        };
        this.messages.push(newMessage);

        return newMessage;
    }

    async getMessagesByIds(messageIds: MessageType['id'][]): Promise<MessageType[]> {
        return intersectionWith(this.messages, messageIds, (m, id) => m.id === id);
    }
}
