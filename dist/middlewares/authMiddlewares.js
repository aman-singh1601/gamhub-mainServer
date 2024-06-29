"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jwtHandler_1 = require("../api/auth/jwtHandler");
const authenticateUser = (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = (0, jwtHandler_1.verifyToken)(token);
            const userId = decodedToken.id;
            req.body = Object.assign(Object.assign({}, req.body), { userId });
        }
        next();
    }
    catch (_a) {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};
exports.authenticateUser = authenticateUser;
