import { prisma } from "../lib/prisma.js";
import { urlDB, type UrlData } from "../models/url.model.js";

import { generateCode } from "../utils/generateCode.js";

export const createShortUrl = async(
  originalUrl: string,
  customAlias?: string,
  expiryMinutes?: number,
): Promise<UrlData> => {
  const shortCode = customAlias || generateCode();
  const urlData: UrlData = {
    originalUrl,
    shortCode,
    visits: 0,
    createdAt: new Date(),
    expiresAt: expiryMinutes
      ? new Date(Date.now() + expiryMinutes * 60 * 1000)
      : undefined,
  };
  urlDB.set(shortCode, urlData);
  const newUrl = await prisma.url.create({
    data: {
        originalUrl,
        shortCode,
    }
  })
  return urlData;
};


export const getUrl = async(code: string): Promise<UrlData | undefined> => {
    await prisma.url.findUnique({
        where:{
            shortCode: code
        }
    })
    return urlDB.get(code);
};

export const deleteUrl = (code: string): boolean=>{
    return urlDB.delete(code);
}

export const incrementVisits = (code:string): void=>{
    const data = urlDB.get(code);
    if(data){
        data.visits++;
    }
}
