import type {Request, Response, NextFunction} from "express"

export const validateUrlMiddleware = (req: Request, res: Response, next: NextFunction)=>{
    const {originalUrl} = req.body;
    if(!originalUrl || typeof originalUrl !== "string"){
        return res.status(400).json({error: "Invalid URL"})
    }
    try{
        new URL(originalUrl);
    }catch{
        return res.status(400).json({
            success:false,
            message: "Invalid URL format"
        })
    }
    next(); 
}