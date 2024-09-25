import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Answer } from 'src/answer/answer.model';
import { Comment } from 'src/comments/comment.model';
import { Post } from 'src/post/post.model';

type UserCreateAttr = {
    username: string;
    avatar: string;
    email: string;
    name: string;
    surname: string;
    password: string;
};

@Table({ tableName: 'user' })
export class User extends Model<User, UserCreateAttr> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    username: string;

    @Column({ type: DataType.STRING, allowNull: true })
    avatar: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    surname: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @HasMany(() => Post)
    posts: Post[];

    @HasMany(() => Comment)
    comments: Comment[];

    @HasMany(() => Answer)
    answers: Answer[];
}
