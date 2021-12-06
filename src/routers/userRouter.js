import express from "express";
import { getJoin } from "../controllers/userController";

const userRouter = express.Router();

userRouter.route("/join").get(getJoin);

export default userRouter;