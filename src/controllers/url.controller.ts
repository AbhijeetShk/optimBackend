import type {Request, Response} from "express";
import { createShortUrl, deleteUrl, getUrl, incrementVisits } from "../services/url.service.js";

// import { createShortUrl,getUrl, deleteUrl, incrementVisits } from "./../services/url.service";  

export const shortenUrl = (req: Request, res:Response)=>{
    const {url, customAlias, expiryMinutes} = req.body;

    if(!url){
        return res.status(400).json({
            message: "Url is req"
        })
    }

    try{
        const data = createShortUrl(url, customAlias, expiryMinutes)
    

    return res.status(201).json({
        shortCode: data.shortCode,
        shortUrl: `http://localhost:3000/${data.shortCode}`,
    })
}
    catch(error:any){{
        return res.status(409).json({
            message:error.message,
        })
    }
};
}

export const redirectUrl = (req:Request, res:Response)=>{
const {code} = req.params;
const data = getUrl(code as string);

if(!data){
    return res.status(404).json({
        message: "Url not found",
    })
}
if(data.expiresAt && new Date()>data.expiresAt){
    return res.status(410).json({
        message: "Link expired",
    })
}
incrementVisits(code as string);
return res.redirect(data.originalUrl);
}

export const getStats = (req: Request, res:Response)=>{
    const {code} = req.params;
    const data = getUrl(code as string);
    if(!data){
        return res.status(404).json({
message: "URL not found",
        })
    }
    return res.status(200).json({
        // shortCode: data.shortCode,
        originalUrl: data.originalUrl,
        visits: data.visits,
        createdAt: data.createdAt,
        expiresAt: data.expiresAt,
    });
}
export const removeUrl = (
    req: Request,
    res:Response
)=>{
    const {code} = req.params;
    const deleted = deleteUrl(code as string);
    if(!deleted){
        return res.status(404).json({
            message: "URL not found",
        })
    }
    return res.status(200).json({
        message: "URL deleted successfully",
    });
}