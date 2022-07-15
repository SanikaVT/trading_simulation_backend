/**
 * Author: Udit Gandhi
 * BannerID: B00889579
 * Email: udit.gandhi@dal.ca
 */
import mongoose from "mongoose";

type TInput = {
  url: string;
};

/**
 * Helps to connect to the Mongo DB.
 */
export default ({ url }: TInput) => {
  const connect = () => {
    mongoose
      .connect(url)
      .then(() => {
        return console.info(`Successfully connected to Mongo DB.`);
      })
      .catch((error) => {
        console.error("Error connecting to database: ", error);
        return process.exit(1);
      });
  };

  connect();

  mongoose.connection.on("disconnected", connect);
};
