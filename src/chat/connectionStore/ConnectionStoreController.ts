import {WebSocket} from 'ws';

export interface ConnectionStoreController {
    getConnectionByKey(key: string): WebSocket | undefined;
}
