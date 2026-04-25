import React, { useState, useEffect } from 'react';
import { documentService } from '../../../services/document.service';
import { Trash2, Plus, FileText, Loader2, Upload, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ManageDocuments = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ title: '', file: null });

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const res = await documentService.getAllDocuments();
            setDocuments(res.data.data);
        } catch (error) {
            toast.error("Failed to fetch documents");
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!formData.file || !formData.title) {
            return toast.error("Please provide title and file");
        }

        setUploading(true);
        const data = new FormData();
        data.append('title', formData.title);
        data.append('file', formData.file);

        try {
            await documentService.uploadDocument(data);
            toast.success("Document uploaded!");
            setShowModal(false);
            setFormData({ title: '', file: null });
            fetchDocuments();
        } catch (error) {
            toast.error(error.response?.data?.message || "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this document?")) return;
        
        try {
            await documentService.deleteDocument(id);
            toast.success("Document deleted");
            fetchDocuments();
        } catch (error) {
            toast.error("Delete failed");
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Manage Documents</h1>
                    <p className="text-gray-500">Upload and manage official foundation documents.</p>
                </div>
                <button 
                    onClick={() => setShowModal(true)}
                    className="btn-primary !py-3 !px-6 flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" /> Add Document
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {documents.map((doc) => (
                        <div key={doc._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group">
                            <div className="flex items-center gap-4 overflow-hidden">
                                <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary shrink-0">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div className="overflow-hidden">
                                    <h3 className="font-bold text-gray-900 truncate" title={doc.title}>{doc.title}</h3>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{doc.fileType} • {doc.fileSize}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => handleDelete(doc._id)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                    {documents.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-400">No documents found. Start by adding one.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Upload Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h2 className="text-xl font-bold text-gray-900">Upload Document</h2>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        <form onSubmit={handleUpload} className="p-8 space-y-6">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Document Title</label>
                                <input 
                                    type="text" 
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                                    placeholder="Enter title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">File (PDF/DOC)</label>
                                <div className="relative group">
                                    <input 
                                        type="file" 
                                        required
                                        accept=".pdf,.doc,.docx"
                                        className="hidden" 
                                        id="file-upload"
                                        onChange={(e) => setFormData({...formData, file: e.target.files[0]})}
                                    />
                                    <label 
                                        htmlFor="file-upload"
                                        className="w-full flex flex-col items-center justify-center gap-4 px-4 py-8 rounded-2xl border-2 border-dashed border-gray-200 hover:border-primary hover:bg-primary/5 cursor-pointer transition-all"
                                    >
                                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all">
                                            <Upload className="w-6 h-6" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-bold text-gray-700">{formData.file ? formData.file.name : 'Select a file'}</p>
                                            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Max size: 100MB</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                disabled={uploading}
                                className="w-full btn-primary py-4 rounded-2xl flex items-center justify-center gap-3"
                            >
                                {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                                {uploading ? 'Uploading...' : 'Confirm Upload'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageDocuments;
