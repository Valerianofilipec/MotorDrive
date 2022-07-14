import 'dotenv/config'
import { promisify } from 'util';
import Redis from "ioredis";

//env variables
const password = process.env.REDIS_PASSWORD;

//redisClient.get(value:string)
function getRedis(value: string){
    const syncRedisGet = promisify(redisClient.get).bind(redisClient);
    return syncRedisGet(value);
};

//redisClient.set(key:string, value:string)
function setRedis(key:string, value: string){
    const syncRedisSet = promisify(redisClient.set).bind(redisClient);
    return syncRedisSet(key,value);
};

const redisClient = new Redis({
    password,
});

export{redisClient};