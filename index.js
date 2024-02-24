import bodyParser from "body-parser";
import express from 'express';
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";

const _dirName = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

function logger(req, res, next) {
    console.log("Method: " + req.method);
    console.log("Request URL: " + req.url);
    next();
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("combined"));
app.use(logger);

app.get("/", (req, res) => {
    res.sendFile(_dirName + "/public/index.html");

 });

app.post("/submit", (req, res) => { 
    res.send(`<h1>Your brand name: </h1> ${req.body["pet"]} ${req.body.street}`)
})

app.listen(port, () => { 
    console.log(`Server started on port ${port}`);
});