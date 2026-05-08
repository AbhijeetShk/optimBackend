import { Router } from "express";
import { shortenUrl,  redirectUrl, getStats, removeUrl } from "../controllers/url.controller.js";
import { validate } from "../middleware/validate.middlware.js";
import { creatUrlSchema } from "../validators/url.validator.js";

const router = Router();
router.post("/shorten", validate(creatUrlSchema), shortenUrl);
router.get("/stats/:code", getStats);
router.delete("/:code", removeUrl);
router.get("/:code", redirectUrl);
export default router;