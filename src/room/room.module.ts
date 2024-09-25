import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Room } from './rooms.model';

@Module({
    providers: [RoomService],
    controllers: [RoomController],
    imports: [SequelizeModule.forFeature([Room])],
})
export class RoomModule {}
