import { Event } from '../models/eventSchema.js';
import cloudinary from 'cloudinary'
import {ApiError, asyncHandler} from '../errorHandler.js'

export const createEvent = async (req, res) => {
  try {
    const imageList = req.files.map(file => ({
      url: file.path,        // The full URL
      public_id: file.filename // The Cloudinary ID (e.g., "ngo_events/abc123")
    }));
    // 2. Create the database entry
    const newEvent = await Event.create({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location || "NGO Premises", // Handle missing location
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      images: imageList || [] // Saving the array of object list to MongoDB
    });

    res.status(201).json({
      success: true,
      message: "Event published with Cloudinary images!",
      data: newEvent
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, location, startDate, endDate, removedImages } = req.body;

    let event = await Event.findById(id);
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });

    // 1. Purani images delete karna (Agar removedImages bheja hai)
    if (removedImages) {
      const parsedRemoved = JSON.parse(removedImages);
      for (let publicId of parsedRemoved) {
        await cloudinary.uploader.destroy(publicId);
        event.images = event.images.filter(img => img.public_id !== publicId);
      }
    }

    // 2. Nayi images handle karna
    // Multer-storage-cloudinary ne images pehle hi upload kar di hain!
    // Hame bas unka URL aur Public ID database mein save karna hai.
    if (req.files && req.files.length > 0) {
      const newImageData = req.files.map(file => ({
        url: file.path,        // multer-storage-cloudinary mein 'path' URL hota hai
        public_id: file.filename // 'filename' public_id hota hai
      }));

      event.images = [...event.images, ...newImageData];
    }

    // 3. Text fields update
    if (title) event.title = title;
    if (description) event.description = description;
    if (location) event.location = location;
    if (startDate) event.startDate = startDate;
    if (endDate) event.endDate = endDate;

    const updatedEvent = await event.save();

    res.status(200).json({
      success: true,
      message: "Event Updated!",
      data: updatedEvent
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    // 2. Delete images from Cloudinary
    if (event.images && event.images.length > 0) {
      const deletePromises = event.images.map((imageObj) => {
        // Use the public_id stored in the object directly
        // No need to split URLs!
        return cloudinary.uploader.destroy(imageObj.public_id);
      });

      await Promise.all(deletePromises);
    }

    // 3. Delete the record from MongoDB
    await Event.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Event and associated images deleted successfully!"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllEvents = asyncHandler(async (req, res) => {
     const events=await Event.find({})

     if(!events){
      throw new ApiError(400,"events not found!")
     }

     return res.status(200).json({
        success: true,
        data: events
     });
});