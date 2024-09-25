import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { Comment } from 'src/comments/comment.model';
import { User } from 'src/user/user.model';

type PostCreateAttr = {
    title: string;
    content: string;
    image: string;
    userId: number;
};

@Table({ tableName: 'post' })
export class Post extends Model<Post, PostCreateAttr> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @Column({ type: DataType.STRING, allowNull: true })
    content: string;

    @Column({ type: DataType.STRING, allowNull: true })
    image: string;

    @Column({ type: DataType.INTEGER, allowNull: true })
    like: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @BelongsTo(() => User)
    author: User;

    @HasMany(() => Comment)
    comments: Comment[];
}
