import { Redis } from "ioredis";
import { env } from "../config/env.js"


export const pub = new Redis(env.REDIS);
export const sub = new Redis(env.REDIS);

pub.on("connect", () => {
    console.log("Redis pub connected" );
});

sub.on("connnect", () => {
    console.log("Redis sub connected" );
});
