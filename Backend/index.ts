import express from "express";
import ConnectDB from "./src/db/connectDB";
import cookieParser from "cookie-parser";
/* import { register } from "./src/Routes/register"; */

const app = express();

const PORT = 8001;

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const server = async (): Promise<void> => {
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

app.get('/api/v1/',register)