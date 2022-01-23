import {LoginCredentials} from 'src/types/request/LoginCredentials';

export default (_, credentials: LoginCredentials) => {
    console.log(credentials);
    return 'Success';
};
