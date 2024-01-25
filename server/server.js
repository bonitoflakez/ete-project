import express from "express";
import cors from "cors";
import { startDB } from "./config/db.config.js";

import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.routes.js";

const app = express();

startDB();

app.use(cors());

app.set("view engine", "ejs");
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

app.use("/api", (req, res, next) => {
  res.send("hello");
});

app.listen(5000, () => console.log("[Server] App running on port 5000"));
