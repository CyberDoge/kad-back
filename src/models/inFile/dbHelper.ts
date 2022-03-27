import {isValid, parseISO} from 'date-fns';
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

async function readFromFile(fileName: string): Promise<object> {
    if (!fs.existsSync(DB_FOLDER_PATH + fileName)) {
        writeToFile(fileName);
    }

    return JSON.parse(await fs.promises.readFile(DB_FOLDER_PATH + fileName, 'utf8'), (k, v) =>
        k.toLocaleLowerCase().includes('date') && typeof v === 'string' && isValid(parseISO(v)) ? parseISO(v) : v);
}

function writeToFile(fileName: string) {
    return <T>(data: T extends string ? never : T) =>
        fs.writeFile(DB_FOLDER_PATH + fileName, JSON.stringify(data, null, 2), {flag: 'w'}, function (err) {
            if (err) throw err;
        });
}

export const helper = (path: string) => ({
    readFromFile: readFromFile.bind(this, path),
    writeToFile: writeToFile(path)
});
