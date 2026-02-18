import dotenv from 'dotenv';

dotenv.config();

export const env = {
    PORT: process.env.PORT!,
    FRONTEND: process.env.FRONTEND!,
    BACKEND: process.env.BACKEND!,
    ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
    REDIS: process.env.REDIS_URL!,
}