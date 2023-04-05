import express, {Request, Response} from "express";
import jwt from 'jsonwebtoken';
import { currentUser } from "@themicroledger/ticketing-common";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req :Request, res: Response) => {
 // console.log("in route /api/users/currentuser", req.currentUser);
 res.send({ currentUser: req.currentUser || null});
});

export { router as currentUserRouter };
