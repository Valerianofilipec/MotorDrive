import 'dotenv/config'
import { verify } from "jsonwebtoken";
import { delRedis, getRedis, keysRedis } from '../../db/cache/redisConfig';
import { AppError } from "../errors/AppError";


export const decrementExpiredTokens = async ()=>{
    try {
        //require keysToken array from redis
        const tokenKeys: string[] = await keysRedis("UserId_*");

         tokenKeys.map(async (key) => {
            const token = await getRedis(key);
            try {
                const decoded = verify(token,process.env.JWT_SECRET);
            } catch (error) {
                await delRedis(key);
            }
        });
        return;
    } catch (error) {
        return new AppError('Error decrementing Expired Tokens', 500);
    }
}

export const checkTokens = () => setInterval(()=>{
    decrementExpiredTokens();
    console.log("decrementing tokens...")
}, 59*1000);