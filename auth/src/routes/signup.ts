import express, { request, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import cookieSession from "cookie-session";
import { RequestValidationError, BadRequestError } from "@themicroledger/ticketing-common";
import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //  throw new RequestValidationError('Invalid email or password');
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    //  console.log('existingUser :',existingUser);
    if (existingUser) {
      throw new BadRequestError("User already exists");
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate JWT token
    const userJwt = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY!);

    // Store it on session Object
    req.session = {
      // user: {
      //   id: user.id,
      //   email: user.email,
      // },
      jwt: userJwt
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
