// Importing deps
require("dotenv").config();
const express = require("express");
import { Router, Request, Response, NextFunction } from "express";
const bodyParser = require("body-parser");
var cors = require("cors");
var fileupload = require("express-fileupload");

// Declaring mongo database
import { connectDB } from "./db";

// Declaring app and port
const app = express();
const port = process.env.PORT || 5000;

// Cors (found the nice explanatino on "https://stackoverflow.com/questions/56798251/node-js-with-angular-cors-error-when-i-send-request")

app.use(
  cors({
    origin: true, // "true" will copy the domain of the request back
    // to the reply. If you need more control than this
    // use a function.

    credentials: true, // This MUST be "true" if your endpoint is
    // authenticated via either a session cookie
    // or Authorization header. Otherwise the
    // browser will block the response.

    methods: "POST,GET,PUT,OPTIONS,DELETE", // Make sure you're not blocking
    // pre-flight OPTIONS requests
  })
);

//Adding middleware for requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Handling file uploads
app.use(fileupload());

// Adding logging for request
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.method + " request for " + req.url);
  next();
});

///////////////////////////
/* Routes */
import { userRouter } from "./routes/user.routes";
import { photoRouter } from "./routes/photo.routes";

// Mounting middleware to app
app.use("/user", userRouter());
app.use("/photo", photoRouter());
///////////////////////////

// Starting express server
const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

// Creating DB Connection
connectDB();

// Default display
app.get("/", (req: Request, res: Response) =>
  res.sendFile(__dirname + "/index.html")
);

module.exports = server;
