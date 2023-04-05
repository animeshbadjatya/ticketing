import express from "express";
import mongoose from "mongoose";
import { app } from "./app";

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

