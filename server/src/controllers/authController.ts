import { Request, Response } from "express";
import { prisma } from "../config/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/env";



function signToken(user: {id:string;email:string;role:string}) {
return jwt.sign(
    {id:user.id,email:user.email,role:user.role},
    config.jwtSecret as string,
    {expiresIn: config.jwtExpiration as string} as jwt.SignOptions
)

}

function toPublicUser(user: {id:string;email:string;role:string;name:string;createdAt:Date}) {

return {
    id:user.id,
    email:user.email,
    role:user.role,
    name:user.name,
    createdAt:user.createdAt,
}

}



export const AuthController = {
    async register(req:Request,res:Response) {
        try {
            const {email,passwordHash,name} = req.body;

            if(!email.trim() || !password) {
                return res.status(400).json({message: "Email and password are required"});
            }

            if (passwordHash.length < 6) {
                return res.status(400).json({message: "Password must be at least 8 characters long"});
            }
            const existingUser = await prisma.user.findUnique({
                where: {email},
            });

            if(existingUser){
                return res.status(400).json({message: "User already exists"});
            }

            const hashedPassword = await bcrypt.hash(passwordHash, 10);
            const user = await prisma.user.create({
                data: {email:email.trim(),passwordHash:hashedPassword,name:name.trim()},
            });

            const token = signToken(toPublicUser(user));
            return res.status(201).json({message: "User created successfully",user:toPublicUser(user),token});

        }catch(error:any) {
            return res.status(500).json({message: "Internal server error",error: error.message});
        }
    }
}