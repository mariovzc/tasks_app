import mongoose from "mongoose";

export default async () => {
  try {
    //database Name
    const { MONGO_URI } = process.env;

    const con = await mongoose.connect(MONGO_URI);
    console.log(`Database connected : ${con.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
