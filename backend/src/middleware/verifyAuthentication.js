import jwt from 'jsonwebtoken';

export function verifyAuthToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        res.status(400).json({message: 'access denied; missing auth token'});
        return;
    }
    const secretKey = 'super_secret_key';
    const verified = jwt.verify(token, secretKey);
    if (!verified ) {
        console.error('[AUTH SERVICE] authentication failed; invalid token');
        res.status(400).json({message: 'authentication failed; invalid token'});
        return;
    }
    // if (verified.username !== req.header.username) {
    //     console.error('[AUTH SERVICE] authentication failed; invalid token for this user');
    //     res.status(400).json({message: 'authentication failed; invalid token for this user'});
    //     return;
    // }
    req.username = verified.username;
    console.log('[AUTH SERVICE] authentication successful');
    next(); // perform the next callback operation
}