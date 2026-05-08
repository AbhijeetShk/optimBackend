import type { NextFunction, Request, Response } from "express";
import { registerUserService, loginUserService } from "../services/auth.service.js";


export const register = async(
    req:Request,res:Response,next:NextFunction
)=>{
try{
    const {email, password} = req.body; 
    const user = await registerUserService(email, password);
    return res.status(201).json({
        message: "User registered successfully",
        userId: user.id,
    })
} catch (error) {
    next(error);

}
}
export const login = async (
  req:Request,res:Response,next:NextFunction
) => {
  try {
    const { email, password } = req.body;

    const data = await loginUserService(
      email,
      password
    );

    return res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};