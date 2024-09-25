import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'room' })
export class Room extends Model<Room> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ type: DataType.INTEGER })
    userId: number;

    @Column({ type: DataType.INTEGER })
    friendId: number;
}
