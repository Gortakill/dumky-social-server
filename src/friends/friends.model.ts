import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'friends', timestamps: false })
export class Friends extends Model<Friends> {
    @Column({ type: DataType.INTEGER, primaryKey: true })
    userId: number;

    @Column({ type: DataType.INTEGER, primaryKey: true })
    friendId: number;

    @Column({ type: DataType.STRING, allowNull: true })
    userAvatar: string;

    @Column({ type: DataType.STRING, allowNull: true })
    username: string;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isConfirmed: boolean;
}
