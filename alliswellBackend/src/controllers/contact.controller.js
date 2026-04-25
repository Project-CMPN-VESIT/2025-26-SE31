import {Contact}  from '../models/contactSchema.js';
import user from '../models/user.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { ApiError, asyncHandler } from '../errorHandler.js';

export const submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, phone, enquiryType, message } = req.body;

  // Optional: Associate with user if logged in
  const token = req.cookies?.admin_accesstoken || req.cookies?.accesstoken || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);
  let userId = null;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
      userId = decoded.id;
    } catch (err) {
      // Token invalid or expired, continue as guest
    }
  }

  const newEntry = await Contact.create({
    name,
    email,
    phone,
    enquiryType,
    message,
    user: userId
  });

  res.status(201).json({
    success: true,
    message: 'Thank you! Your message has been sent.',
    data: newEntry
  });
});

export const updateEnquiryStatus = asyncHandler(async (req, res) => {
  const { status, reply } = req.body;
  const updateData = { status };
  
  if (reply) {
    updateData.reply = reply;
    updateData.repliedAt = Date.now();
  }

  const enquiry = await Contact.findByIdAndUpdate(
    req.params.id,
    updateData,
    { returnDocument: 'after' }
  );

  if (!enquiry) {
    throw new ApiError(404, 'Enquiry not found');
  }

  res.status(200).json({
    success: true,
    data: enquiry
  });
});

export const getAllEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await Contact.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    count: enquiries.length,
    data: enquiries
  });
});

export const getMyEnquiries = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const role = req.user?.role;
  
  if (!userId) {
    throw new ApiError(401, 'Authentication required');
  }

  const currentUser = await user.findById(userId);
  if (!currentUser) {
    throw new ApiError(404, 'User not found');
  }

  let filter = {
    $or: [
      { user: new mongoose.Types.ObjectId(userId) }, // Enquiries explicitly linked to this user
      { 
        $and: [
          { email: currentUser.email }, 
          { user: null } // Only guest enquiries with this email (not linked to any other user)
        ] 
      }
    ]
  };

  const enquiries = await Contact.find(filter).sort({ createdAt: -1 });
  
  res.status(200).json({
    success: true,
    data: enquiries
  });
});