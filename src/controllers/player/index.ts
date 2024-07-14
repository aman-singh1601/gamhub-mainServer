import { Request, Response, request } from "express";

import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient();

async function getPlayerProfile(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const {userId} = req.body;
        
        let player: any = await prisma.user.findUnique({
            where: {
                id
            }
        });

        const isFollowing = await prisma.follow.findFirst({
            where: {
                followerId: userId,
                followingId: id
            }
        });

        const isBlocked = await prisma.block.findFirst({
            where: {
                blockerId: userId,
                blockedId: id
            }
        })

        res.status(200).json({
            message: "Player Followed",
            player,
            isFollowing: !!isFollowing,
            isBlocked: !!isBlocked
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

async function followPlayer(req: Request, res: Response) {
    try {
        const {id, userId} = req.body;

        const followData = await prisma.follow.create({
            data: {
                followerId: userId,
                followingId: id
            },
            include: {
                following: true
            }
        });

        res.status(200).json({
            message: "Player Followed",
            followData
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error
        })
    }
}

async function unfollowPlayer(req: Request, res: Response) {
    try{
        const {id, userId} = req.body;

        const isFollowing: any = await prisma.follow.findFirst({
            where: {
                followerId: userId,
                followingId: id
            }
        });

        const unfollowedData = await prisma.follow.delete({
            where: {
                id: isFollowing.id
            },
            include: {
                following: true
            }
        });

        return res.status(200).json({
            message: "Player Unfollowed",
            unfollowedData
        })

    } catch(error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}   

export { getPlayerProfile, followPlayer, unfollowPlayer };