import {z} from "zod";
import {AppError} from "../utils/AppError.js";

export const loginSchema = z.object({
    email: z.email({message:"Invalid email format"}),
    password:z.string().min(6, "Password must be at least 6 characters long")
})