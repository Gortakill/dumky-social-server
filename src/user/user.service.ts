import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './dto/CreateUserDto';
import { FileService } from 'src/file/file.service';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private fileService: FileService,
    ) {}

    async createUser(dto: CreateUserDto) {
        try {
            const user = await this.userRepository.create(dto);
            return user;
        } catch (err) {
            throw new HttpException(
                'this user is alredy create',
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    async updateAvatar(avatar: string, userId: number) {
        try {
            const user = await this.userRepository.findOne({
                where: { id: userId },
            });
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            const file = await this.fileService.createFile(avatar);
            if (user.avatar) {
                await this.fileService.deleteFile(user.avatar);
            }
            await user.update({ avatar: file });
            return {
                message: 'Avatar is sucssesful update',
                status: 200,
            };
        } catch {
            throw new HttpException(
                'Failed to update avatar',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async updateUserInfo(dto: UpdateUserDto, userId: number) {
        console.log(dto);
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        if (dto.name !== '' && dto.surname !== '' && dto.username !== '') {
            await user.update({
                username: dto.username,
                surname: dto.surname,
                name: dto.name,
            });
            return {
                message: 'user is succesfully update',
                status: 200,
            };
        }
        if (dto.name !== '' && dto.surname !== '' && dto.username === '') {
            await user.update({ surname: dto.surname, name: dto.name });
            return {
                message: 'user is succesfully update',
                status: 200,
            };
        }
        if (dto.name !== '' && dto.surname === '' && dto.username === '') {
            await user.update({ name: dto.name });
            return {
                message: 'user is succesfully update',
                status: 200,
            };
        }
        if (dto.name === '' && dto.surname === '' && dto.username !== '') {
            await user.update({ surname: dto.surname });
            return {
                message: 'user is succesfully update',
                status: 200,
            };
        }
        if (dto.name === '' && dto.surname === '' && dto.username !== '') {
            await user.update({ username: dto.username });
            return {
                message: 'user is succesfully update',
                status: 200,
            };
        }
        if (dto.name !== '' && dto.surname === '' && dto.username !== '') {
            await user.update({ username: dto.username, name: dto.name });
            return {
                message: 'user is succesfully update',
                status: 200,
            };
        }
        if (dto.name === '' && dto.surname !== '' && dto.username !== '') {
            await user.update({ username: dto.username, surname: dto.surname });
            return {
                message: 'user is succesfully update',
                status: 200,
            };
        }
    }

    async getAllUsers() {
        const userInfo = await this.userRepository.findAll();
        const users = userInfo.map((user) => {
            return {
                id: user.id,
                username: user.username,
                avatar: user.avatar,
            };
        });
        return users;
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new HttpException(
                'user with this id is not found',
                HttpStatus.NOT_FOUND,
            );
        }
        return user;
    }

    async getAnotherUserById(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new HttpException(
                'user with this id is not found',
                HttpStatus.NOT_FOUND,
            );
        }
        return {
            id: user.id,
            username: user.username,
            avatar: user.avatar,
        };
    }
    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        return user;
    }
}
