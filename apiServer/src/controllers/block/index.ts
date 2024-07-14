import { Request, Response } from "express";

import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient();

async function blockUser(req: Request, res: Response) {
    const {userId, id} = req.body;

    //todo
    const isAlreadyBlocked = await prisma.block.findFirst({
        where: {
            blockerId: userId,
            blockedId: id
        }
    });

    if(isAlreadyBlocked) {
        return res.status(200).json({
            message: "already blocked",
        })
    }

    const blocked = await prisma.block.create({
        data: {
            blockerId: userId,
            blockedId: id
        }
    });

    res.status(200).json({
        message: "User blocked",
        isBlocked: !!blocked
    })

}

async function unblockUser(req: Request, res: Response) {
    const {userId} = req.body;
    const {id} = req.params;

    const isAlreadyUnBlocked = await prisma.block.findFirst({
        where: {
            blockerId: userId,
            blockedId: id
        }
    });

    if(!isAlreadyUnBlocked) {
        return res.status(200).json({
            message: "user already unblocked"
        })
    }

    const unblocked = await prisma.block.delete({
        where: {
            id: isAlreadyUnBlocked.id
        }
    })

    res.status(200).json({
        message: "User unblocked",
        isBlocked: false
    })


}

async function isBlockedByUser(req: Request, res: Response) {
    const {userId} = req.body;
    //todo



}

export {blockUser, unblockUser, isBlockedByUser};