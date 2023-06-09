import express from "express";
import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if(!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not defined");
  }
  if(!process.env.JWT_KEY){
    throw new Error("JWT_KEY not set");
  }
  try {
  await mongoose.connect(process.env.MONGO_URI,{
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

