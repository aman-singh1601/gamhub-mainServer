import { Request, Response } from "express";
import "dotenv/config";

import { PrismaClient } from '@prisma/client'
import { generateToken } from "../../api/auth/jwtHandler";

const prisma = new PrismaClient();


async function authRegister(req: Request, res: Response) {
    const { number } = req.body;
    try {

        const isRegistered = await prisma.user.findUnique({
            where: {
                phone_number: number
            }
        });
        
        if (isRegistered) {
            let token = generateToken(isRegistered);
            return res.status(200).json({
                "message": "User logged in",
                user: isRegistered,
                token

            })
        }
        const user = await prisma.user.create({
            data: {
                phone_number: number,
            }
        })

        const token = generateToken(user);

        res.status(200).json({
            "message": "Login Successfull",
            user,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "interval server error",
            error
        })
    }
}

async function getAllUsers(req: Request, res: Response) {
    const { userId } = req.body;

    const users = await prisma.user.findMany({
        where: {
            NOT: {
                id: userId
            }
        }
    })

    res.status(200).json({
        "message": "wokring on it",
        users
    })

}

async function getFollowing(req: Request, res: Response) {
    try {
        const { userId } = req.body;

        const followingUsers = await prisma.follow.findMany({
            where: {
                followerId: userId
            },
            include: {
                following: true
            }
        });

        res.status(200).json({
            message: "list of following users",
            followingUsers
        })
    } catch (error) {
        res.json(500).json({
            message: "Internal Server Error, getFollowing",
            error
        })
    }

}


export { authRegister, getAllUsers, getFollowing };