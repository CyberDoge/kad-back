import {parseISO} from 'date-fns';
import fs from 'fs';
import path from 'path';
import {cwd} from 'process';

export const DB_FOLDER_PATH = `${cwd() + path.sep}.db${path.sep}`;

function createDirIfNotExist(path: string) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}

createDirIfNotExist(DB_FOLDER_PATH);

export async function readFromFile(fileName: string): Promise<object> {
    if (!fs.existsSync(DB_FOLDER_PATH + fileName)) {
        writeToFile(fileName, '');
    }

    return JSON.parse(await fs.promises.readFile(DB_FOLDER_PATH + fileName, 'utf8'), (k, v) =>
        k === 'date' && typeof v === 'string' ? parseISO(v) : v);
}

export function writeToFile(fileName: string, data: string) {
    fs.writeFile(DB_FOLDER_PATH + fileName, data, {flag: 'w'}, function (err) {
        if (err) throw err;
    });
}
