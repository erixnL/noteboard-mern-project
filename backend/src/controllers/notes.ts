import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../until/assertIsDefined";

export const getNotes: RequestHandler = async (req, res, next)=> {
    const authenticatedUserId = req.session.userId;
    try {
        assertIsDefined(authenticatedUserId);
        //exec() turned it to a promise
        //a filter to find the userId mathces autheticated user
        const notes = await NoteModel.find({userId: authenticatedUserId}).exec();
        res.status(200).json(notes);
    } catch (error) {
        //middleware create end points
        next(error);
    }
};

export const getNote: RequestHandler =async (req, res, next) => {
    const noteId = req.params.noteId;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid Note ID");
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }
        if(note.userId?.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this note.");
        } 
        res.status(200).json(note);
    } catch(error){
        next(error);
    }
}

interface CreateNoteBody {
    title?: string,
    text?: string,
}
//four arguments need to declare for types: params, res body, req body, LocalObj
export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> =async (req, res, next) => {
    const title = req.body.title;
    const text = req.body.text;
    const authenticatedUserId = req.session.userId;
    
    try {
        assertIsDefined(authenticatedUserId);
        if (!title) {
            throw createHttpError(400, "Note mush have a title");
        }

        const newNote = await NoteModel.create({
            userId: authenticatedUserId,
            title: title,
            text: text,
        });
        res.status(201).json(newNote);
    } catch(error) {
        next(error);
    }
};

interface UpdateNoteParams {
    noteId: string,
}

interface UpdateNoteBoday {
    title?: string,
    text?: string,
}

//params need to be cleared to a specific note, identifier in the url to find the end point to update
export const updateNote: RequestHandler<UpdateNoteParams, unknown, UpdateNoteBoday, unknown> = async(req, res, next) => {
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid Note ID");
        }

        if (!newTitle) {
            throw createHttpError(400, "Note mush have a title");
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        if(note.userId?.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this note.");
        }

        note.title = newTitle;
        note.text = newText;
        
        const updatedNote = await note.save();

        res.status(200).json(updatedNote);

    } catch(error) {
        next(error);
    }
};

export const deleteNote: RequestHandler = async(req, res, next) => {
    const noteId = req.params.noteId;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid Note ID");
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }
        
        if(note.userId?.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this note.");
        }

        await note.deleteOne();

        //res.status doesn't send a response. .json() does instead
        //.sendStatus to set the status and send at the same time
        res.sendStatus(204);

    } catch(error) {
        next(error)
    }
}