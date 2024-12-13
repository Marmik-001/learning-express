import 'dotenv/config'
import mongoose from "mongoose";
import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import "./strategies/local-strategy.mjs";
import dotenv from "dotenv"
dotenv.config()

const app = express();
const PORT = process.env.PORT 

mongoose
  .connect("mongodb://localhost/express-tut")
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));

app.use(cookieParser("secretMSG"));
app.use(express.json());
app.use(
  session({
    secret: "Marmik Shah",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    })
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);
// app.use(userRouter);

app.post(
  "/api/local-auth",
  passport.authenticate("local"),
  (request, response) => {
    response.send(request.user);
  }
);

app.get("/api/local-auth/status", (request, response) => {
  console.log("get user:", request.user);
  console.log(request.sessionStore);
  
  request.user
    ? response.send({ msg: "user found" })
    : response.sendStatus(401);
});

app.post("/api/local-auth/logout", (request, response) => {
  if (!request.user) return response.sendStatus(401);
  request.logOut((error) => {
    if (error) return response.sendStatus(401);
    response.sendStatus(200);
  });
});

//enter as many middleware you want , can also stop the next middlware from running by not calling the next() function
app.get("/", (request, response) => {
  console.log(request.session);
  console.log(request.sessionID);
  request.session.visited = true;

  // response.cookie("hello", "world", { maxAge: 30000, signed: true });

  response.status(201).send({ msg: "hello" });
});

app.listen(PORT, () => {
  console.log(process.env.PORT);
  
  console.log(`The server is running on ${PORT}`);
});
