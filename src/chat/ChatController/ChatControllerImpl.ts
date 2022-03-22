import {inject, injectable} from 'inversify';
import {TYPES} from 'src/ioc';
import {ContextUser} from 'src/types/ContextUser';
import {MessageRequest} from 'src/types/request';
import {MessageResponse} from 'src/types/response';
import {ChatInteractor} from 'src/useCaseInteractors/interfaces';
import {ConnectionStoreController} from '../connectionStore';
import {ChatEventEmitter} from '../eventEmitter';
import {EVENT_TYPES} from '../eventTypes';
import {ChatController} from './ChatController';

@injectable()
export class ChatControllerImpl implements ChatController {
    constructor(
        @inject(TYPES.ConnectionStore) private connectionStoreController: ConnectionStoreController,
        @inject(TYPES.ChatInteractor) private chatInteractor: ChatInteractor,
        @inject(TYPES.ChatEventEmitter) private chatEventEmitter: ChatEventEmitter,
    ) {
        this.connectionStoreController = connectionStoreController;
        this.chatInteractor = chatInteractor;
        this.chatEventEmitter.setEventListener(EVENT_TYPES.sendMessageForUsers, this.sendMessageForUsers.bind(this));
    }

    receiveMessage(route: string, message: MessageRequest, user: ContextUser) {
        this.chatInteractor.receiveMessageAndBroadcastToRoom({...message, ownerId: user.id});
    }

    sendMessage(route: string, message: unknown, userId: string) {
        const connectionByKey = this.connectionStoreController.getConnectionByKey(userId);
        if (!connectionByKey) {
            return;
        }
        try {
            connectionByKey.send(JSON.stringify(message));
        } catch (e) {
            // todo normal error logging
            console.log(e);
            this.connectionStoreController.closeConnectionByKey(userId);
        }
    }


    sendMessageForUsers(message: MessageResponse, userIds: string[]) {
        for (const userId of userIds) {
            this.sendMessage('messageFromUser', message, userId);
        }
    }
}