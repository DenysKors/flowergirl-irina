import mongoose from "mongoose";

import Plant from "@/modelsDB/plant";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  const MONGODB_URI = process.env.MONGODB_URL;

  if (!MONGODB_URI) {
    throw new Error("Define the MONGODB_URI environmental variable");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("Db connection successful");

      Plant.createIndexes([
        {
          name: "title_search",
          key: { title: "text" },
        },
      ]);
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
