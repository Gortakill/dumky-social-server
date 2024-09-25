import { IsNumber, IsString } from 'class-validator';

export class CreateAnswerDto {
    @IsString()
    text: string;

    @IsNumber()
    commentId: number;

    @IsNumber()
    userId: number;
}
