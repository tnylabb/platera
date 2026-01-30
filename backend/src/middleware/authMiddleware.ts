import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';

export interface AuthRequest extends Request {
    user?: string | jwt.JwtPayload;
}

const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    let token =
        req.body?.token ||
        req.query?.token ||
        req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send("Token szükséges a hozzáféréshez!");
    }

    try {
        if (!config.jwtSecret) {
            return res.status(500).send("Szerver hiba: Nincs titkos kulcs");
        }

        const decodedToken = jwt.verify(token, config.jwtSecret);
        req.user = decodedToken;

        return next();
    } catch (e) {
        return res.status(401).send("Hibás vagy lejárt token");
    }
};

export default verifyToken;