import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  // const connectionUrl = "mongodb+srv://alex:alex@cluster0.lsc7ofn.mongodb.net/";
  const connectionUrl =
    "mongodb+srv://alex:testAlex@fortestprojectsclaster.tej2sm0.mongodb.net/";
  mongoose
    .connect(connectionUrl, configOptions)
    .then(() => console.log("Ecommerce database connected successfully!"))
    .catch((err) =>
      console.log(`Getting Error from DB connection ${err.message}`)
    );
};

export default connectToDB;
