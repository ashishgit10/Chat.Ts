import express from "express";
import ConnectDB from "./src/db/connectDB.js";
import cookieParser from "cookie-parser";
import router from "./src/Routes/registerUser.js";

import cors from "cors"
const app = express();

const PORT = 8001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
const server = async () => {
  try {
    await ConnectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    console.log("DB connected successfully");
  } catch (err) {
    console.log("DB connection unsuccessful", err);
  }
};
server();
app.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/")
})
app.use("/api/v1", router);

