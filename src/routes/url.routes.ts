import { Router } from "express";
import { shortenUrl,  redirectUrl, getStats, removeUrl } from "../controllers/url.controller.js";
import { validateUrlMiddleware } from "../middleware/validate.middlware.js";

const router = Router();
router.post("/shorten", validateUrlMiddleware, shortenUrl);
router.get("/stats/:code", getStats);
router.delete("/:code", removeUrl);
router.get("/:code", redirectUrl);
export default router;