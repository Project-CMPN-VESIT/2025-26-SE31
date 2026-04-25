import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Mail, User, RefreshCw, MessageSquare, Phone, Send, CheckCircle2, Clock, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { contactService } from '../../../services/contact.service';

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [updating, setUpdating] = useState(false);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const response = await contactService.getAllEnquiries();
      const rawData = response.data || response;
      const dataList = Array.isArray(rawData) ? rawData : (rawData.data && Array.isArray(rawData.data) ? rawData.data : []);
      setEnquiries(dataList);
    } catch (error) {
      toast.error('Failed to load enquiries');
      setEnquiries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusUpdate = async (id, newStatus, reply = '') => {
    setUpdating(true);
    try {
      await contactService.updateStatus(id, newStatus, reply);
      toast.success(`Enquiry marked as ${newStatus}`);
      if (selectedEnquiry) setSelectedEnquiry(null);
      fetchEnquiries();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update enquiry');
    } finally {
      setUpdating(false);
    }
  };

  const filteredEnquiries = enquiries.filter(enq => {
    const typeMatch = filter === 'All' || enq.enquiryType === filter;
    const statusMatch = statusFilter === 'All' || enq.status === statusFilter;
    return typeMatch && statusMatch;
  });

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-serif font-black text-primary">Enquiry <span className="text-secondary italic">Helpdesk</span></h1>
          <p className="text-gray-500 font-medium mt-1">
            Track and resolve community requests ({filteredEnquiries.length} found).
          </p>
        </div>
        <button
          onClick={fetchEnquiries}
          disabled={loading}
          className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all shadow-soft disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Sync
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-premium grid md:grid-cols-2 gap-10">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 ml-2">Request Category</label>
          <div className="flex flex-wrap gap-2">
            {['All', 'Admission', 'Volunteer', 'General'].map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === t ? 'bg-primary text-white shadow-lg' : 'bg-background-light text-gray-400 hover:text-primary hover:bg-white'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 ml-2">Resolution Status</label>
          <div className="flex flex-wrap gap-2">
            {['All', 'New', 'In Progress', 'Resolved'].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${statusFilter === s ? 'bg-secondary text-white shadow-lg' : 'bg-background-light text-gray-400 hover:text-secondary hover:bg-white'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enquiries Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {loading ? (
          <div className="col-span-full py-20 text-center font-black uppercase tracking-widest text-gray-300">Syncing Communications...</div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="col-span-full py-20 text-center font-black uppercase tracking-widest text-gray-300">No matching requests</div>
        ) : (
          filteredEnquiries.map((enq) => (
            <motion.div 
              layout
              key={enq._id} 
              className="bg-white rounded-[2.5rem] p-10 shadow-premium border border-gray-50 hover:border-primary/20 transition-all flex flex-col group"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary font-black text-xl group-hover:bg-primary group-hover:text-white transition-all">
                    {enq.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-black text-primary">{enq.name}</h3>
                    <div className="text-[10px] font-black uppercase tracking-widest text-secondary">{enq.enquiryType}</div>
                  </div>
                </div>
                <div className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                  enq.status === 'Resolved' ? 'bg-green-100 text-green-700' : 
                  enq.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 
                  'bg-red-100 text-red-700'
                }`}>
                  {enq.status}
                </div>
              </div>

              <div className="flex-grow space-y-6">
                 <div className="p-6 bg-background-light rounded-2xl border border-gray-100 text-sm text-gray-600 font-medium leading-relaxed italic">
                    "{enq.message}"
                 </div>
                 
                 {enq.reply && (
                   <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
                      <div className="text-[9px] font-black uppercase tracking-widest text-green-600 mb-2 flex items-center gap-2">
                         <CheckCircle2 className="w-3 h-3" /> Official Response
                      </div>
                      <p className="text-sm text-green-800 font-bold">{enq.reply}</p>
                   </div>
                 )}

                 <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-xs text-gray-400 font-bold">
                       <Mail className="w-4 h-4 text-primary" /> {enq.email}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 font-bold justify-end">
                       <Clock className="w-4 h-4 text-primary" /> {formatDate(enq.createdAt)}
                    </div>
                 </div>
              </div>

              <div className="mt-10 pt-8 border-t border-gray-50 flex gap-4">
                 <button 
                   onClick={() => {
                     setSelectedEnquiry(enq);
                     setReplyText(enq.reply || '');
                   }}
                   className="flex-1 py-4 bg-primary/5 text-primary rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                 >
                   <MessageSquare className="w-4 h-4" /> {enq.reply ? 'Edit Response' : 'Reply & Resolve'}
                 </button>
                 <select 
                   value={enq.status}
                   onChange={(e) => handleStatusUpdate(enq._id, e.target.value, enq.reply)}
                   className="px-4 py-4 bg-background-light text-primary rounded-xl text-[10px] font-black uppercase tracking-widest border-none focus:ring-0 cursor-pointer"
                 >
                   <option value="New">New</option>
                   <option value="In Progress">In Progress</option>
                   <option value="Resolved">Resolved</option>
                 </select>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Reply Modal */}
      <AnimatePresence>
        {selectedEnquiry && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedEnquiry(null)}
              className="absolute inset-0 bg-primary/20 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-xl rounded-[3rem] shadow-premium relative z-10 p-12 md:p-16"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-serif font-black text-primary">Official <span className="text-secondary italic">Response</span></h2>
                <button onClick={() => setSelectedEnquiry(null)} className="p-3 bg-gray-100 rounded-2xl hover:bg-secondary hover:text-white transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-2">Original Message</label>
                  <div className="p-6 bg-background-light rounded-2xl border border-gray-100 text-sm text-gray-500 font-medium italic">
                    "{selectedEnquiry.message}"
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-2">Your Reply</label>
                  <textarea 
                    rows="4"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full px-6 py-5 bg-white rounded-2xl border-2 border-gray-100 focus:border-primary focus:outline-none font-bold resize-none shadow-soft"
                    placeholder="Provide information or steps taken..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <button 
                     onClick={() => handleStatusUpdate(selectedEnquiry._id, 'In Progress', replyText)}
                     disabled={updating}
                     className="py-5 bg-blue-50 text-blue-700 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 hover:text-white transition-all"
                   >
                     Mark In Progress
                   </button>
                   <button 
                     onClick={() => handleStatusUpdate(selectedEnquiry._id, 'Resolved', replyText)}
                     disabled={updating}
                     className="py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-premium hover:bg-secondary transition-all"
                   >
                     Reply & Resolve
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminEnquiries;
