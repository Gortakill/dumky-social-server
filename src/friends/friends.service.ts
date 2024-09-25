import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Friends } from './friends.model';
import { User } from 'src/user/user.model';

type TypeFriends = {
    username: string;
    avatar: string;
};

@Injectable()
export class FriendsService {
    constructor(
        @InjectModel(Friends) private friendsRepository: typeof Friends,
        @InjectModel(User) private userRepository: typeof User,
    ) {}

    async addFriend(userId: number, friendId: number) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        const friend = await this.userRepository.findOne({
            where: { id: friendId },
        });
        if (!friend) {
            throw new HttpException(
                'User with this id is not found',
                HttpStatus.NOT_FOUND,
            );
        }
        await this.friendsRepository.create({
            userId,
            friendId,
            userAvatar: user.avatar,
            username: user.username,
            isConfirmed: false,
        });
        return {
            message: 'Friend request send',
            status: 200,
        };
    }

    async getUnconfirmedFriend(userId: number) {
        console.log('unconfirmed friend');
        const unconfirmed = await this.friendsRepository.findAll({
            where: { friendId: userId, isConfirmed: false },
        });
        if (!unconfirmed) {
            throw new HttpException('Invites not found', HttpStatus.NOT_FOUND);
        }
        return unconfirmed;
    }

    async ConfirmedFriend(userId: number, friendId: number) {
        const add = await this.friendsRepository.findOne({
            where: { userId, friendId },
        });
        if (!add) {
            throw new HttpException(
                'This invite is not found',
                HttpStatus.NOT_FOUND,
            );
        }
        await this.friendsRepository.update(
            { isConfirmed: true },
            { where: { userId, friendId } },
        );

        await this.friendsRepository.create({
            userId: friendId,
            friendId: userId,
            isConfirmed: true,
        });
        return {
            message: 'Friend is succesfull added',
            status: 200,
        };
    }

    async getFriends(userId: number) {
        const confirmedFriend = await this.friendsRepository.findAll({
            where: { userId, isConfirmed: true },
        });
        const promiseFriends = confirmedFriend.map(async (friend) => {
            const user = await this.userRepository.findOne({
                where: { id: friend.friendId },
            });
            return {
                id: user.id,
                username: user.username,
                avatar: user.avatar,
            };
        });
        const friends = Promise.all(promiseFriends).then((resolvedFriends) => {
            return resolvedFriends;
        });
        return friends;
    }

    async deleteFriend(userId: number, friendId: number) {
        try {
            await this.friendsRepository.destroy({
                where: { userId, friendId },
            });
            await this.friendsRepository.destroy({
                where: { userId: friendId, friendId: userId },
            });
            return {
                message: 'Delete friend is sucssesfull',
                status: 200,
            };
        } catch {
            throw new HttpException('Failed to delete friend', 500);
        }
    }
}
