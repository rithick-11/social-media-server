import { Router } from "express";
import { authCheck, login, signUp } from "../controller/auth.contoller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/sign-up", signUp);
router.post("/login", login);
router.get("/check", authenticate, authCheck);

export default router;
