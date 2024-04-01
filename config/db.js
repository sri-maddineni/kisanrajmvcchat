import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Increase the server selection timeout to 5 seconds
      // and the socket timeout to 20 seconds
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 20000
    });
    console.log(`Connected to MongoDB`.bgMagenta.white);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`.bgRed.white);
    process.exit(1); // Exit process with failure
  } 
};

export default connectDB;
