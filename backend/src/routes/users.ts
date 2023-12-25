import express from "express";
import * as userController from "../controllers/users";

const router = express.Router();

router.post("/signup", userController.signUp);

export default router;