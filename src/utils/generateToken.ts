import jwt from "jsonwebtoken"

export const generateToken = (userId:number) =>{
    const secretKey = process.env.JWT_SECRET || "your_secret_key";
    const token = jwt.sign({userId}, secretKey, {expiresIn: "1h"})
    return token;
}