import { Request, Response } from "express";
<<<<<<< HEAD
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
=======
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/database";
import { config } from "../config/env";

const SALT_ROUNDS = 10;

function signToken(user: { id: string; email: string; role: string }) {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn } as jwt.SignOptions
  );
}

function toPublicUser(user: {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
}) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: user.createdAt,
  };
}

export const AuthController = {
  async register(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;

      if (!email?.trim() || !password || !name?.trim()) {
        return res
          .status(400)
          .json({ message: "البريد الإلكتروني وكلمة المرور والاسم مطلوبة" });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" });
      }

      const existing = await prisma.user.findUnique({
        where: { email: email.trim().toLowerCase() },
      });

      if (existing) {
        return res
          .status(400)
          .json({ message: "البريد الإلكتروني مستخدم مسبقاً" });
      }

      const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
      const user = await prisma.user.create({
        data: {
          email: email.trim().toLowerCase(),
          passwordHash,
          name: name.trim(),
        },
      });

      const token = signToken(user);

      return res.status(201).json({
        token,
        user: toPublicUser(user),
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "حدث خطأ أثناء إنشاء الحساب" });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email?.trim() || !password) {
        return res
          .status(400)
          .json({ message: "البريد الإلكتروني وكلمة المرور مطلوبان" });
      }

      const user = await prisma.user.findUnique({
        where: { email: email.trim().toLowerCase() },
      });

      if (!user) {
        return res
          .status(401)
          .json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
      }

      const valid = await bcrypt.compare(password, user.passwordHash);

      if (!valid) {
        return res
          .status(401)
          .json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
      }

      const token = signToken(user);

      return res.status(200).json({
        token,
        user: toPublicUser(user),
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "حدث خطأ أثناء تسجيل الدخول" });
    }
  },

  async me(req: Request, res: Response) {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "المستخدم غير موجود" });
    }

    return res.status(200).json(user);
  },
};
>>>>>>> 3019ad0 (sad)
