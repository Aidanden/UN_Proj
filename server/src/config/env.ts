import dotenv from "dotenv";

dotenv.config();

export const config = {
    port: process.env.PORT ?? "7000",
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET ?? "dev-secret-change-in-production",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
};




