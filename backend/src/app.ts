import "dotenv/config";
import express, {NextFunction, Request, Response} from "express";
import notesRoutes from "./routes/notes";

const app = express();

app.use("/api/notes", notesRoutes);

app.use((req, res, next)=> {
    next(Error("Endpoint not found"))
})

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