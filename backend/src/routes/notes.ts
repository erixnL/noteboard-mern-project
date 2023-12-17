import express from "express";
import * as NoteController from "../controllers/notes";

//set endpoints on your router
const router = express.Router();

router.get("/", NoteController.getNotes);

router.get("/:noteId", NoteController.getNote);

router.post("/", NoteController.createNote);

router.patch("/:noteId", NoteController.updateNote);

export default router;