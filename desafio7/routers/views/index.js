import { Router } from "express";
import home from "./home.js";

const router = Router();
router.use("/", home);

export default router;
