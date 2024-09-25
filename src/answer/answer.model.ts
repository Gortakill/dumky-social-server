import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { Comment } from 'src/comments/comment.model';
import { User } from 'src/user/user.model';

interface AnswerCreateAttr {
    text: string;
    commentId: number;
    userId: number;
}

@Table({ tableName: 'answer' })
export class Answer extends Model<Answer, AnswerCreateAttr> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    text: string;

    @ForeignKey(() => Comment)
    @Column({ type: DataType.INTEGER })
    commentId: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @BelongsTo(() => Comment)
    comment: Comment;

    @BelongsTo(() => User)
    user: User;
}
