import mongoose from "mongoose";

export default async () => {
  try {
    //database Name
    const { MONGO_URI } = process.env;

    const con = await mongoose.connect(MONGO_URI);
    // eslint-disable-next-line no-console
    console.log(`Database connected : ${con.connection.host}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }

};
