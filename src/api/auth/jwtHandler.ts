import jwt from "jsonwebtoken";
import 'dotenv/config';

const generateToken = (user: any) => {
    if (!process.env.SECRET_KEY) {
        throw new Error('SECRET_KEY is not defined in the environment variables');
    }
    return jwt.sign({ id: user.id, phone_number: user.phone_number}, process.env.SECRET_KEY, {
        expiresIn: '3h'
    });
};
const verifyToken = (token: string) => {
    if (!process.env.SECRET_KEY) {
        throw new Error('SECRET_KEY is not defined in the environment variables');
    }
    return jwt.verify(token, process.env.SECRET_KEY);
};

export {generateToken, verifyToken};