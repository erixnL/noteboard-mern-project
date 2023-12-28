import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const requiresAuth: RequestHandler = (req, res, next) => {
    if (req.session.userId) {
        //next middleware will be the next endpoints 
        next();
    } else {
        next(createHttpError(401, "User not authenticated"));
    }
};