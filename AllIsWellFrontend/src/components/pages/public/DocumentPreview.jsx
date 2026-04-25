import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FileText, Download, ArrowLeft, Loader2, ExternalLink } from 'lucide-react';
import { documentService } from '../../../services/document.service';
import { toast } from 'react-hot-toast';

const DocumentPreview = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const res = await documentService.getDocumentById(id);
        setDocument(res.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Unable to load document');
      } finally {
        setLoading(false);
      }
    };
    fetchDocument();
  }, [id]);

  const previewUrl = documentService.getPreviewUrl(id);

  const handleDownload = async () => {
    try {
      const response = await fetch(`${previewUrl}?download=true`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = window.document.createElement('a');
      link.href = blobUrl;
      const safeTitle = document.title.replace(/[^a-zA-Z0-9]/g, '_');
      link.download = `${safeTitle}${document.fileType === 'PDF' ? '.pdf' : ''}`;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      toast.error('Download failed');
      console.error("Download failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light p-6">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
          <p className="mt-4 text-gray-600 uppercase tracking-[0.2em] text-xs">Loading Preview...</p>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="min-h-screen bg-background-light p-6">
        <div className="max-w-3xl mx-auto text-center py-24">
          <p className="text-gray-500 text-lg">Document not found.</p>
          <Link to="/documents" className="inline-flex mt-6 items-center gap-2 text-primary font-semibold">
            <ArrowLeft className="w-4 h-4" /> Back to Documents
          </Link>
        </div>
      </div>
    );
  }

  // Google Docs Viewer as fallback for extra reliability
  const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + previewUrl)}&embedded=true`;

  return (
    <div className="min-h-screen bg-background-light py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-secondary font-black mb-2">Document Preview</p>
            <h1 className="text-3xl font-bold text-gray-900">{document.title}</h1>
            <p className="text-sm text-gray-500 mt-2">{document.fileType} • {document.fileSize}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/documents"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Documents
            </Link>

            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-background-light border border-gray-200 px-4 py-2 text-sm font-semibold text-primary hover:bg-gray-50 transition"
            >
              <ExternalLink className="w-4 h-4" /> Open in New Tab
            </a>

            {/* fl_attachment tells Cloudinary to force download */}
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition"
            >
              <Download className="w-4 h-4" /> Download
            </button>
          </div>
        </div>

        {document.fileType === 'PDF' ? (
          <div className="overflow-hidden rounded-[2rem] border border-gray-200 shadow-sm bg-white">
            {/* Direct PDF URL — browser renders it inline, no download */}
            <iframe
              src={`${previewUrl}#toolbar=0&navpanes=0`}
              type="application/pdf"
              title={document.title}
              className="w-full min-h-[80vh]"
            />
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-gray-200 bg-white p-12 text-center">
            <FileText className="mx-auto mb-6 w-12 h-12 text-secondary" />
            <h2 className="text-xl font-bold text-gray-900 mb-4">Preview not available for this file type</h2>
            <p className="text-gray-500 mb-6">
              For {document.fileType} documents, the browser cannot render the file directly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-5 py-3 text-sm font-semibold text-primary hover:bg-gray-50 transition"
              >
                <ExternalLink className="w-4 h-4" /> Open in New Tab
              </a>
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition"
              >
                <Download className="w-4 h-4" /> Download
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentPreview;