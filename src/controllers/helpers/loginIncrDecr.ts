import 'dotenv/config'
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError"


export const decrementExpiredTokens = async ()=>{
    try {
        //request the Token_Array from redis
        const tokenArray: string[] = [
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InZmY0BnbWFpbC5jb20iLCJ1c2VyVHlwZSI6Im1hbmFnZXIifSwiaWF0IjoxNjU3ODE2NzYzLCJleHAiOjE2NTc4MjAzNjN9.zDfECahPVQK9TybyoNvkQOnPlouxpidMK8a5xgwvlO0"
        ];

        const tokenArrayUpdated = tokenArray.filter((token) => {
            verify(token,process.env.JWT_SECRET);
        });

        
        /*
            save the tokenArrayUpdated as main Token_Array on redis
        */

        return;

    } catch (error) {
        return new AppError('Error decrementing Expired Tokens', 500);
    }
}