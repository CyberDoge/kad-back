import fs from 'fs';
import path from 'path';

export const DB_FOLDER_PATH = `${__dirname + path.sep}.db${path.sep}`;

function createIfNotExist(path: string) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}

createIfNotExist(DB_FOLDER_PATH);

export async function readFromFile(fileName: string): Promise<string> {
    createIfNotExist(fileName);

    return await fs.promises.readFile(fileName, 'utf8');
}

export function writeToFile(fileName: string, data: string) {
    createIfNotExist(fileName);

    fs.writeFile(fileName, data, () => {
        return;
    });
}
