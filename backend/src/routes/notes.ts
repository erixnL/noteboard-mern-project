import express from "express";
import * as NoteController from "../controllers/notes";

//set endpoints on your router
const router = express.Router();

router.get("/", NoteController.getNotes);

export default router;