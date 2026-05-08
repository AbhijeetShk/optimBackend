import {Router} from "express"

import {register, login} from "../controllers/auth.controller.js"
import { validate } from "../middleware/validate.middlware.js";
import { loginSchema } from "../validators/auth.validator.js";

const router = Router();

router.post("/register", register);
router.post("/login", validate(loginSchema), login);

export default router;