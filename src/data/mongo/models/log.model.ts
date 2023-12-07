
import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high'],
    default: 'low'
  },
  message: {
    type: String,
    required: true,
  },
  origin: String,
  createdAt: {
    type: Date,
    default: new Date()
  }
});


export const logModel = mongoose.model('Log', logSchema);