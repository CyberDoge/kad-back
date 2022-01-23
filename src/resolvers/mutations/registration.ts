import {RegisterCredentials} from 'src/types/request/RegisterCredentials';

export default (_, credentials: RegisterCredentials) => {
    console.log(credentials);
    return 'Success';
};
