import mongoose from "mongoose";

const ConnectDB = async (): Promise<void> => {
  try {
    const connect = await mongoose
      .connect("http://127.0.0.1:27017/Chat")
      .then(() => {
        console.log("DB connected Successfully");
      });
  } catch (err) {
    console.log("Connection DB unsuccessfull", err);
  }
};
export default ConnectDB;
