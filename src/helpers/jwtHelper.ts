import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import {parsedConf} from 'src/configure';
import {ContextUser} from 'src/types/ContextUser';

export const codeUser = (user: ContextUser): string => {
    return jwt.sign(user,
        parsedConf.JWT_SECRET,
        {algorithm: 'HS256', expiresIn: '1y'}
    );
};

export const decodeUser = (token?: string): ContextUser | null => {
    if (!token) {
        return null;
    }

    const decoded = jwt.decode(token);
    if (!decoded) {
        return null;
    }

    return decoded as ContextUser;
};

export const jwtMiddleWare = expressJwt({
    secret: parsedConf.JWT_SECRET,
    algorithms: ['HS256'],
    credentialsRequired: false
});
