import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";

const PORT = 7770;
const app = express();
const morganMiddleWare = morgan("dev");
app.use(morganMiddleWare);

app.use("/assets", express.static("assets"));
app.set("view engine","pug");
app.set("views", process.cwd()+"/src/views");
app.use("/", globalRouter);
app.use("/user", userRouter);

const handleListening = () =>
  console.log(`✅ Server listening gon port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
