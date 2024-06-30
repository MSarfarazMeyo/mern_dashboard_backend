import mongoose from "mongoose";
import { ConnectOptions } from "mongoose";
mongoose.set("strictQuery", true);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true, // Optional but no longer required in recent MongoDB Node.js driver versions
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log(`Database Connected: ${process.env.MONGO_URI}`);
  } catch (err) {
    console.error("Database Connection Error", err);
  }
};

export default connectDB;
