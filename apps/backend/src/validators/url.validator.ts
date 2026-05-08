import {z} from "zod"

export const creatUrlSchema = z.object({
    url: z.url({message: "Invalid URL format"}),
    customAlias: z.string().optional(),
    expiryMinutes: z.number().optional(),
    
})