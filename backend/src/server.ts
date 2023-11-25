import express from "express";
const app = express();
const port = 8000;

app.get("/", (req, res)=> {
    res.send("Hello New World");
});

//start the server
app.listen(port, ()=> {
    console.log("server running on port: " + port);
})