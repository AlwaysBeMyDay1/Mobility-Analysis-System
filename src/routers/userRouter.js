import express from "express";
import { getPath } from "../controllers/userController";

const userRouter = express.Router();

// userRouter.route("/join").get(getJoin);
userRouter.route("/path").get(getPath);

export default userRouter;