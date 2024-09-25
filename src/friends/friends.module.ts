import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { UserModule } from 'src/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Friends } from './friends.model';
import { User } from 'src/user/user.model';

@Module({
    providers: [FriendsService],
    controllers: [FriendsController],
    imports: [SequelizeModule.forFeature([Friends, User]), UserModule],
})
export class FriendsModule {}
