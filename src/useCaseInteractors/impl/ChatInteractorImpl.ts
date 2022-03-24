import {inject, injectable} from 'inversify';
import {ChatEventEmitter} from 'src/chat/eventEmitter/ChatEventEmitter';
import {EVENT_TYPES} from 'src/chat/eventTypes';
import {TYPES} from 'src/ioc';
import {MessageType, RoomType, UserType} from 'src/models/interfaces';
import {MessageService, RoomService} from 'src/services/interfaces';
import {ChatInteractor, Message} from 'src/useCaseInteractors/interfaces';

@injectable()
export class ChatInteractorImpl implements ChatInteractor {
    private messageService: MessageService;
    private roomService: RoomService;
    private chatEventEmmitor: ChatEventEmitter;

    constructor(
        @inject(TYPES.MessageService) messageService: MessageService,
        @inject(TYPES.RoomService) roomService: RoomService,
        @inject(TYPES.ChatEventEmitter) chatEventEmmitor: ChatEventEmitter
    ) {
        this.messageService = messageService;
        this.roomService = roomService;
        this.chatEventEmmitor = chatEventEmmitor;
    }

    markMessageAsRead(messageId: MessageType['id'], userId: UserType['id']) {
        throw new Error('not implemented');
    }

    receiveMessageAndBroadcastToRoom(message: Message) {
        this.messageService.saveMessage({...message, hidden: false, dateOfCreating: new Date(), readBy: [],});
        this.chatEventEmmitor.emmit(EVENT_TYPES.sendMessageForUsers, message);
    }

    getTenMessagesInRoom(roomId: RoomType['id'], from: number): MessageType[] {
        this.messageService.getNMessagesByRoomId(roomId, from, )
    }

}