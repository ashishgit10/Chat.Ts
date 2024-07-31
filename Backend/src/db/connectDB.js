import mongoose from "mongoose";

const ConnectDB = async ()=> {
  try {
    const connect = await mongoose
      .connect("mongodb://127.0.0.1:27017/Chat")
      .then(() => {
        console.log("DB connected Successfully");
      });
  } catch (err) {
    console.log("Connection DB unsuccessfull", err);
  }
};
export default ConnectDB;
