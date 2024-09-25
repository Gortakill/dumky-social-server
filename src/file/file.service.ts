import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FileService {
    async createFile(file: any) {
        const fileName = uuid.v4() + '.jpg';
        const pathToFile = path.resolve(__dirname, '..', '..', 'src', 'static');
        if (!fs.existsSync(pathToFile)) {
            fs.mkdirSync(pathToFile, { recursive: true });
        }
        fs.writeFileSync(path.join(pathToFile, fileName), file.buffer);
        return fileName;
    }

    async deleteFile(fileName: string) {
        const pathToFile = path.resolve(__dirname, '..', '..', 'src', 'static');
        fs.unlinkSync(path.join(pathToFile, fileName));
    }
}
