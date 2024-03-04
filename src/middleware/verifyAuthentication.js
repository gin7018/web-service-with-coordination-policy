import jwt from 'jsonwebtoken';

export function verifyAuthentication(req, res, next) {
    const token = req.header('Authorization');
    if (!token) {
        res.status(400).json({message: 'access denied; missing auth token'});
        return;
    }
    const secretKey = process.env["JWT_SECRET_KEY "] || 'super_secret_key';
    const verified = jwt.verify(token, secretKey);
    if (!verified) {
        res.status(400).json({message: 'authentication failed; invalid token'});
        return;
    }
    next(); // perform the next callback operation
}