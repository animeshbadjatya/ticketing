import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@themicroledger/ticketing-common";

import { assetClassRouter } from "./routes/assetclass";

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
app.use(assetClassRouter);

app.all("*", async (req, res) => {
    console.log('Here you');
  throw new NotFoundError();
});

app.use(errorHandler);

export {app};