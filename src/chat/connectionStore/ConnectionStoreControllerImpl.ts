import {injectable} from 'inversify';
import {WebSocket} from 'ws';
import {ConnectionStore, ConnectionStoreController} from './index';

@injectable()
export class ConnectionStoreControllerImpl implements ConnectionStoreController, ConnectionStore {
    private socketMap: Map<string, WebSocket>;

    constructor() {
        this.socketMap = new Map<string, WebSocket>();
    }

    closeConnectionByKey(key: string) {
        this.socketMap.get(key)?.close();
        this.socketMap.delete(key);
    }

    getConnectionByKey(key: string): WebSocket | undefined {
        return this.socketMap.get(key);
    }

    addConnection(key: string, socket: WebSocket) {
        this.socketMap.set(key, socket);
    }
}