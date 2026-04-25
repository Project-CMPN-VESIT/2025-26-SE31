import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number']
  },
  enquiryType: {
    type: String,
    enum: ['Admission', 'Donation', 'Volunteer', 'General'],
    default: 'General'
  },
  message: {
    type: String,
    required: [true, 'Message cannot be empty'],
    minLength: [10, 'Message must be at least 10 characters long']
  },
  status: {
    type: String,
    enum: ['New', 'In Progress', 'Resolved'],
    default: 'New'
  },
  reply: {
    type: String,
    default: ''
  },
  repliedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

export const Contact = mongoose.model('Contact', contactSchema);