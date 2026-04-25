import React, { useEffect, useState } from 'react';
import { FileText, Download, Eye, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { documentService } from '../../../services/document.service';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await documentService.getAllDocuments();
      setDocuments(res.data.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  // Force-download using the backend preview endpoint with content-disposition: attachment
  const handleDownload = async (doc) => {
    try {
      const previewUrl = documentService.getPreviewUrl(doc._id);
      const response = await fetch(`${previewUrl}?download=true`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = doc.title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="bg-background-light min-h-screen py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <motion.div
          className="text-center mb-24 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-secondary font-black tracking-[0.2em] uppercase text-sm mb-4 block">Transparency & Trust</span>
          <h1 className="mb-6 leading-tight">Official <span className="text-secondary italic">Documents</span></h1>
          <p className="text-xl text-gray-600 leading-relaxed font-medium">
            We believe in complete transparency. Access our registration certificates, annual reports, and procedural guidelines here.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Documents...</p>
          </div>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={{
              initial: {},
              whileInView: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <AnimatePresence>
              {documents.length > 0 ? (
                documents.map((doc) => (
                  <motion.div
                    key={doc._id}
                    className="card group bg-white p-8"
                    variants={fadeInUp}
                    layout
                  >
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-14 h-14 bg-secondary/5 rounded-2xl flex items-center justify-center text-secondary group-hover:scale-110 transition-transform duration-500 border border-secondary/10 shadow-soft">
                        <FileText className="w-7 h-7" />
                      </div>
                      <span className="text-[10px] font-black tracking-widest text-gray-400 bg-background-light px-3 py-1.5 rounded-full border border-gray-100 uppercase">
                        {doc.fileType} • {doc.fileSize}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-primary mb-8 line-clamp-2 h-14">{doc.title}</h3>

                    <div className="flex items-center gap-4 pt-8 border-t border-gray-50">
                      {/* View: navigates to the DocumentPreview page (in-app, no download) */}
                      <button
                        onClick={() => navigate(`/documents/preview/${doc._id}`)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-background-light text-primary font-black uppercase tracking-widest text-[10px] hover:bg-gray-100 transition-all border border-gray-100"
                      >
                        <Eye className="w-4 h-4" /> View
                      </button>

                      {/* Download: fetches blob and triggers save-as dialog */}
                      <button
                        onClick={() => handleDownload(doc)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-white font-black uppercase tracking-widest text-[10px] hover:bg-primary-dark transition-all shadow-soft"
                      >
                        <Download className="w-4 h-4" /> Download
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
                  <p className="text-gray-400 font-medium">No documents uploaded yet.</p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Documents;
