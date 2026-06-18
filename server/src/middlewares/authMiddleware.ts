import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { UserRole } from "@prisma/client";
import { config } from "../config/env";

type JwtPayload = {
  userId: string;
  email: string;
  role: UserRole;
};

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "غير مصرح — يرجى تسجيل الدخول" });
  }

  const token = header.slice(7);

  try {
    const payload = jwt.verify(token, config.jwtSecret) as JwtPayload;
    req.user = {
      id: payload.userId,
      email: payload.email,
      role: payload.role,
    };
    next();
  } catch {
    return res.status(401).json({ message: "انتهت صلاحية الجلسة — يرجى تسجيل الدخول مجدداً" });
  }
}
