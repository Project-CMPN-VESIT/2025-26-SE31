import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        default: 'PDF'
    },
    fileSize: {
        type: String,
        required: true
    },
    publicId: {
        type: String, // For Cloudinary if used, or local path
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Document = mongoose.model('Document', documentSchema);
export default Document;
