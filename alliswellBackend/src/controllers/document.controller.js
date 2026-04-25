import Document from '../models/document.model.js';
import { v2 as cloudinary } from 'cloudinary';
import http from 'http';
import https from 'https';
import { ApiError, asyncHandler } from '../errorHandler.js';

export const uploadDocument = asyncHandler(async (req, res) => {
    if (!req.file) {
        throw new ApiError(400, "Please upload a file");
    }

    const { title } = req.body;
    if (!title) {
        throw new ApiError(400, "Title is required");
    }

    // Determine file type from mimetype or originalname extension
    let fileType = 'DOC';
    const mimetype = req.file.mimetype || '';
    const originalname = req.file.originalname || '';
    
    if (mimetype.includes('pdf') || originalname.toLowerCase().endsWith('.pdf')) {
        fileType = 'PDF';
    }

    const document = await Document.create({
        title,
        fileUrl: req.file.path,
        fileType,
        fileSize: req.file.size ? `${(req.file.size / 1024).toFixed(2)} KB` : "Unknown",
        publicId: req.file.filename || req.file.public_id
    });

    res.status(201).json({
        success: true,
        message: "Document uploaded successfully",
        data: document
    });
});

export const getAllDocuments = asyncHandler(async (req, res) => {
    const documents = await Document.find().sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        data: documents
    });
});

export const getDocumentById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const document = await Document.findById(id);

    if (!document) {
        throw new ApiError(404, "Document not found");
    }

    res.status(200).json({
        success: true,
        data: document
    });
});

export const previewDocumentById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const document = await Document.findById(id);

    if (!document) {
        throw new ApiError(404, "Document not found");
    }

    const streamFile = (url) => {
        const fileUrl = new URL(url);
        const client = fileUrl.protocol === 'https:' ? https : http;

        client.get(fileUrl, (previewRes) => {
            // Handle redirects (Cloudinary often redirects from http to https or between nodes)
            if (previewRes.statusCode >= 300 && previewRes.statusCode < 400 && previewRes.headers.location) {
                const redirectUrl = new URL(previewRes.headers.location, fileUrl).toString();
                return streamFile(redirectUrl);
            }

            if (previewRes.statusCode !== 200) {
                console.error(`Cloudinary returned status: ${previewRes.statusCode}`);
                return res.status(502).json({ success: false, message: 'Unable to fetch document preview' });
            }

            // Set headers for the browser to understand it's a PDF/Document
            let contentType = previewRes.headers['content-type'];
            if (document.fileType === 'PDF') {
                contentType = 'application/pdf';
            } else if (!contentType) {
                contentType = 'application/octet-stream';
            }
            res.setHeader('Content-Type', contentType);
            
            if (previewRes.headers['content-length']) {
                res.setHeader('Content-Length', previewRes.headers['content-length']);
            }

            // Use inline or attachment disposition
            const isDownload = req.query.download === 'true';
            const safeTitle = document.title.replace(/[^a-zA-Z0-9]/g, '_');
            const extension = document.fileType === 'PDF' ? '.pdf' : '';
            
            if (isDownload) {
                res.setHeader('Content-Disposition', `attachment; filename="${safeTitle}${extension}"`);
            } else {
                res.setHeader('Content-Disposition', 'inline');
            }

            previewRes.pipe(res);
        }).on('error', (err) => {
            console.error("Streaming error:", err);
            if (!res.headersSent) {
                res.status(502).json({ success: false, message: 'Unable to fetch document preview' });
            }
        });
    };

    streamFile(document.fileUrl);
});

export const deleteDocument = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const document = await Document.findById(id);

    if (!document) {
        throw new ApiError(404, "Document not found");
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(document.publicId, { resource_type: 'raw' });

    // Delete from DB
    await Document.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "Document deleted successfully"
    });
});
