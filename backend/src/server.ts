import "dotenv/config";
import env from "./until/validateEnv"
import mongoose from "mongoose";
import express from "express";
const app = express();

app.get("/", (req, res)=> {
    res.send("Hello New World");
});

const port = env.PORT;

mongoose.connect(env.MONGO_CONNECTION_STRING!)
.then(()=> {
    console.log("Mongoose connected");
    //start the server
    app.listen(port, ()=> {
        console.log("server running on port: " + port);
    });
})
.catch(console.error)
;



