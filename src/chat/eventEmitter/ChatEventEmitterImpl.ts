import {EventEmitter} from 'events';
import {inject, injectable} from 'inversify';
import {TYPES} from 'src/ioc';
import {ConnectionStoreController} from '../connectionStore';
import {EVENT_TYPES} from '../eventTypes';
import {ChatEventEmitter} from './';

@injectable()
export class ChatEventEmitterImpl implements ChatEventEmitter {
    private eventEmmitor: EventEmitter;

    constructor(
        @inject(TYPES.ConnectionStore) private connectionStoreController: ConnectionStoreController,
    ) {
        this.eventEmmitor = new EventEmitter();
        this.connectionStoreController = connectionStoreController;
    }

    emmit<P>(event: typeof EVENT_TYPES[keyof typeof EVENT_TYPES], payload: P, ...rest) {
        this.eventEmmitor.emit(event, payload, ...rest);
    }

    setEventListener(event: typeof EVENT_TYPES[keyof typeof EVENT_TYPES], listener) {
        this.eventEmmitor.on(event, listener);
    }

}