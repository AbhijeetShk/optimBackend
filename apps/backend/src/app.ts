import express from "express"
import urlRoutes from "./routes/url.routes.js";
import { loggerMiddleware } from "./middleware/logger.middleware.js";
import { error } from "node:console";
import { errorMiddleware } from "./middleware/error.middleware.js";
import morgan from "morgan";
// import urlRoutes from "./routes/url.routes"
const app = express();
app.use(express.json());
app.use(morgan("dev"))
app.use(loggerMiddleware)
app.use("/auth", authRoutes);
app.use("/", urlRoutes);
app.use(errorMiddleware)

export default app;