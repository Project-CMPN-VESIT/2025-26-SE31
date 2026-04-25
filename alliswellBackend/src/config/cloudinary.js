import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Temporary log to debug - delete this after it works!
console.log("Configuring Cloudinary with Key:", process.env.CLOUDINARY_KEY);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ngo_events',
    // Remove allowed_formats for a moment to test the connection
    transformation: [{ width: 1000, height: 1000, crop: 'limit' }] 
  },
});

const docStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ngo_documents',
    resource_type: 'raw', // Crucial for non-image files like PDFs
  },
});

export const upload = multer({ 
  storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB
});
export const uploadDocs = multer({ 
  storage: docStorage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB
});