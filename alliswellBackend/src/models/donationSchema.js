import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: [true, 'Donor name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required']
  },
  date: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    enum: ['General', 'Sponsor a Meal', 'Medical Fund', 'Monthly Support'],
    default: 'General'
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Completed'
  }
}, {
  timestamps: true
});

export const Donation = mongoose.model('Donation', donationSchema);
