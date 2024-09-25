import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Room } from './rooms.model';

@Injectable()
export class RoomService {
    constructor(@InjectModel(Room) private roomRepository: typeof Room) {}

    async createRoom(userId: number, friendId: number) {
        try {
            const roomUser = await this.roomRepository.findOne({
                where: { userId, friendId },
            });
            const roomFriend = await this.roomRepository.findOne({
                where: { friendId: userId, userId: friendId },
            });
            if (roomUser || roomFriend) {
                return {
                    message: 'this room is alredy created',
                    status: 200,
                };
            }
            await this.roomRepository.create({ userId, friendId });
            return {
                message: 'room is succesfully created',
                status: 200,
            };
        } catch {
            throw new HttpException('Failed to create room', 500);
        }
    }

    async getAllUserRoom(userId: number) {
        const userRoom = await this.roomRepository.findAll({
            where: { userId },
        });
        const friendRoom = await this.roomRepository.findAll({
            where: { friendId: userId },
        });

        return [...userRoom, ...friendRoom];
    }
}
