import {PATHS} from 'src/chat/route';
import {ChatRequest} from 'src/types/request';

export function isChatRequest(request: unknown): request is ChatRequest {
    return (!!request
        && typeof request === 'object'
        && 'data' in request
        && 'route' in request
        && 'path' in request['route']
        && Object.keys(PATHS).includes(request['route'].path)
    );
}
