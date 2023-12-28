import app from "./app";
import env from "./until/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

mongoose.connect(env.MONGO_CONNECTION_STRING!)
.then(()=> {
    console.log("Mongoose connected");
    //start the server
    app.listen(port, ()=> {
        console.log("server running on port: " + port);
    });
})
.catch(console.error);


