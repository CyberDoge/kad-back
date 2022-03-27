export const PATHS = {
    SEND_MESSAGE_TO_ROOM: 'SEND_MESSAGE_TO_ROOM',
    GET_TEN_MESSAGES: 'GET_TEN_MESSAGES'
};

export type Route = {
    path: (typeof PATHS)[keyof typeof PATHS],
    index?: number
}
