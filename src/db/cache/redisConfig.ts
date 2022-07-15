import 'dotenv/config'
import { promisify } from 'util';
import Redis, { Callback } from "ioredis";

//env variables
const password = process.env.REDIS_PASSWORD;


const redisClient = new Redis({
    password: password,
});

//Promisify redisClient.get(value:string)
function getRedis(value: string){
    const syncRedisGet = promisify(redisClient.get).bind(redisClient);
    return syncRedisGet(value);
};

//Promisify redisClient.set(key:string, value:string)
function setRedis(key:string, value: string){
    const syncRedisSet = promisify(redisClient.set).bind(redisClient);
    return syncRedisSet(key,value);
};

//Promisify redisClient.keys
function keysRedis(key:string):Promise<string[]>{
    const syncRedisKeys = promisify(redisClient.keys).bind(redisClient);
    return syncRedisKeys(key);
};

//Promisify redisClient.del()
function delRedis(...args: string[]){
    const syncRedisDel = promisify(redisClient.del).bind(redisClient);
    return syncRedisDel(...args);
};

export{redisClient, getRedis, setRedis, keysRedis, delRedis};