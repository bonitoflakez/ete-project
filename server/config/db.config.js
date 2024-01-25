import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const startDB = () => {
  mongoose.set("strictQuery", false);

  mongoose
    .connect(`${process.env.MONGO_URI}`)
    .then(() => {
      console.log("[DB] Connected!");
    })
    .catch((err) => {
      console.log(err);
    });
};

export { startDB };
