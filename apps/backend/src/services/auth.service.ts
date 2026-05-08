import bcrypt from "bcryptjs";

import { prisma } from "../lib/prisma.js";
import { generateCode } from "../utils/generateCode.js";
import { use } from "react";
import { generateToken } from "../utils/generateToken.js";

export const registerUserService = async(email:string, password:string)=>{
    const existingUser = await prisma.user.findUnique({
        where: {email}
    })


if(existingUser){
    throw {
        statusCode: 400,
        message: "User already exists"
    }
}

const hashedPassword = await bcrypt.hash(password, 10);
const newUser = await prisma.user.create({
    data:{
        email,
        password:hashedPassword
    }
})
return newUser;
}

export const loginUserService = async(email:string, password:string)=>{
const user = await prisma.user.findUnique({
    where: {email}
})

if(!user){
    throw {
        statusCode: 400,
        message: "Invalid credentials"
    }
}
const isValid = await bcrypt.compare(password, user.password);
if(!isValid){
    throw {
        statusCode: 400,
        message: "Invalid credentials"
    }
}
const token = generateToken(user.id)
return token;

}