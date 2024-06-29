import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../api/auth/jwtHandler";


const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken: any = verifyToken(token);
            const userId = decodedToken.id;
            req.body = {...req.body, userId};
        }

        next();


    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
}

export {authenticateUser};