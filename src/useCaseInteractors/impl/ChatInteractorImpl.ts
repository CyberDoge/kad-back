import {inject, injectable} from 'inversify';
import {ChatEventEmitter} from 'src/chat/eventEmitter/ChatEventEmitter';
import {TYPES} from 'src/ioc';
import {MessageType, RoomType, UserType} from 'src/models/interfaces';
import {MessageService, RoomService} from 'src/services/interfaces';
import {ChatInteractor, Message} from 'src/useCaseInteractors/interfaces';

@injectable()
export class ChatInteractorImpl implements ChatInteractor {
    constructor(
        @inject(TYPES.MessageService) private messageService: MessageService,
        @inject(TYPES.RoomService) private roomService: RoomService,
        @inject(TYPES.ChatEventEmitter) private chatEventEmmitor: ChatEventEmitter
    ) {
    }

    markMessageAsRead(messageId: MessageType['id'], userId: UserType['id']) {
        throw new Error('not implemented');
    }

    receiveMessage(message: Message) {
        return this.messageService.saveMessage({...message, hidden: false, dateOfCreating: new Date(), readBy: [],});
    }

    async getTenMessagesInRoom(userId: UserType['id'], roomId: RoomType['id'], from: number): Promise<MessageType[]> {
        if (await this.roomService.isUserInRoom(userId, roomId)) {
            return this.messageService.getNMessagesByRoomId(roomId, from, 10);
        }

        return [];
    }

}
