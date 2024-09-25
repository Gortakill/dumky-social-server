import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { Answer } from 'src/answer/answer.model';
import { Post } from 'src/post/post.model';
import { User } from 'src/user/user.model';

type CommentCreateAttr = {
    text: string;
    userId: number;
    postId: number;
};

@Table({ tableName: 'comment' })
export class Comment extends Model<Comment, CommentCreateAttr> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    text: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @ForeignKey(() => Post)
    @Column({ type: DataType.INTEGER })
    postId: number;

    @BelongsTo(() => User)
    author: User;

    @BelongsTo(() => Post)
    post: Post;

    @HasMany(() => Answer)
    answers: Answer[];
}
