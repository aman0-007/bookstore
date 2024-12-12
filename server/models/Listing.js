import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  condition: {
    type: String,
    enum: ['new', 'like-new', 'very-good', 'good', 'acceptable'],
    required: true,
  },
  type: {
    type: String,
    enum: ['new', 'used'],
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  auction: {
    endTime: Date,
    currentBid: Number,
    minBid: Number,
    bidHistory: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      amount: Number,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    }],
  },
});

export default mongoose.model('Listing', listingSchema);