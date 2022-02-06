import dotenv from 'dotenv';

const config = dotenv.config();

if (!config.parsed) {
    throw new Error('.env parsing error');
}
export const parsedConf = config.parsed;

