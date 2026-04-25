import mongoose from 'mongoose';

const residentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Resident name is required'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'Age is required']
  },
  admissionDate: {
    type: Date,
    required: [true, 'Admission date is required'],
    default: Date.now
  },
  roomNumber: {
    type: String,
    required: [true, 'Room number is required']
  },
  healthNotes: {
    type: String,
    default: 'No specific notes.'
  },
  status: {
    type: String,
    enum: ['Active', 'Discharged', 'Hospitalized'],
    default: 'Active'
  }
}, {
  timestamps: true
});

export const Resident = mongoose.model('Resident', residentSchema);
