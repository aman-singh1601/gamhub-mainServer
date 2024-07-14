import { Request, Response } from "express";

import { PrismaClient } from '@prisma/client';

function getRandomStreamId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
function generateStream(req: Request, res: Response) {
    try {
        const streamKey = getRandomStreamId();
        const streamUrl = "rtmp://localhost:6969/abc";
        
        res.status(200).json({
            streamKey,
            streamUrl
        });
    } catch (error) {
        console.log("GENERATE_STREAM_ERROR", error);
        return;
    }
}


export {generateStream};