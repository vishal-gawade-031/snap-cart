import mongoose from "mongoose";

const mongodbUrl = process.env.MONGODB_URL as string;

if (!mongodbUrl) {
  throw new Error("MONGODB_URL not defined");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

const connectDb = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongodbUrl)
      .then((mongooseInstance) => mongooseInstance.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDb;
