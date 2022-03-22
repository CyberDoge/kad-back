import {EVENT_TYPES} from 'src/chat/eventTypes';

export interface ChatEventEmitter {
    emmit<P>(event: typeof EVENT_TYPES[keyof typeof EVENT_TYPES], payload: P, ...rest);

    setEventListener<P>(event: typeof EVENT_TYPES[keyof typeof EVENT_TYPES], listener: (payload: P, ...rest) => void);
}