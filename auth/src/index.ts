import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/errors-handler";
import { NotFoundError } from "./errors/not-found-error";
const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false, // Not encrypted cookie
    secure:true   // Accessible only via HTTPS
    //maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  //  keys: [process.env.COOKIE_KEY] // Cookie keys
  })
)

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  if(!process.env.JWT_KEY){
    throw new Error("JWT_KEY not set");
  }
  try {
  await mongoose.connect('mongodb://auth-mongo-srv:27017/auth',{
    serverSelectionTimeoutMS: 50000
  });
  console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    console.log("Listening on 3000!");
  });
};

start();

