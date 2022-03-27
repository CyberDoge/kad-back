import {EventEmitter} from 'events';
import {inject, injectable} from 'inversify';
import {TYPES} from 'src/ioc';
import {ConnectionStoreController} from '../connectionStore';
import {ChatEventEmitter, Events} from './ChatEventEmitter';

@injectable()
export class ChatEventEmitterImpl implements ChatEventEmitter {
    private eventEmitter: EventEmitter;

    constructor(
        @inject(TYPES.ConnectionStore) private connectionStoreController: ConnectionStoreController,
    ) {
        this.eventEmitter = new EventEmitter();
    }


    emmit<EVENT extends keyof Events>(event: EVENT, ...args: Events[EVENT]) {
        this.eventEmitter.emit(event, ...args);
    }

    setEventListener<EVENT extends keyof Events>(event: EVENT, listener: (...args: Events[EVENT]) => void) {
        this.eventEmitter.on(event, listener as (...args: unknown[]) => void);
    }

}
