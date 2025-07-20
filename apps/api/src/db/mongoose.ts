import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const MONGO_DB = process.env.MONGO_DB || 'testdb';

export async function connectMongoose() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(`${MONGO_URL}/${MONGO_DB}`);
  }
}

// Contoh schema/model: Log
const logSchema = new mongoose.Schema({
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const LogModel = mongoose.models.Log || mongoose.model('Log', logSchema); 