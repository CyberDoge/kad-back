import {MessageRequest} from 'src/types/request';

export function isChatMessageRequest(message: unknown): message is MessageRequest {
    return (!!message && typeof message === 'object' && "text" in message && "roomId" in message);
}