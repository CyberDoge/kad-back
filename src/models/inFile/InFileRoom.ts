import {injectable} from 'inversify';
import {Room, RoomType, UserType} from 'src/models/interfaces';
import {v4 as uuid} from 'uuid';
import {helper} from './dbHelper';

const h = helper('room.json');

@injectable()
export class InFileRoom implements Room {
    private rooms: RoomType[];

    constructor() {
        this.rooms = [];
        h.readFromFile().then(res => {
            this.rooms = res as RoomType[];
        }).catch(() => {
            this.rooms = [];
            h.writeToFile(this.rooms);
        });
    }

    async create(room: Omit<RoomType, 'id'>): Promise<RoomType> {
        const newRoom = {
            ...room,
            id: uuid()
        };
        this.rooms.push(newRoom);
        h.writeToFile(this.rooms);

        return newRoom;
    }


    async getNRoomsByUserId(userId: UserType['id'], from: number, count: number): Promise<RoomType[]> {
        return this.rooms.filter(c => c.members.includes(userId)).slice(from, from + count);
    }
}
