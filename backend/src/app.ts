import "dotenv/config";
import express, {NextFunction, Request, Response} from "express";
import NoteModel from "./models/note";

const app = express();

app.get("/", async (req, res, next)=> {
    try {
        const notes = await NoteModel.find().exec();
        res.status(200).json(notes);
    } catch (error) {
        //middleware create end points
        next(error);
    }
});

//setup error handler, middleware function
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction)=> {
    console.error(error);
    let errorMessage = "An unknown erro occurred";
    if (error instanceof Error) errorMessage = error.message;
    //return the error
    res.status(500).json({error: errorMessage})
})

export default app;