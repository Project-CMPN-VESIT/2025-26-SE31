import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Clock, CheckCircle2, AlertCircle, RefreshCw, Mail, Phone, Calendar } from 'lucide-react';
import { contactService } from '../../../services/contact.service';
import toast from 'react-hot-toast';

const UserEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyEnquiries = async () => {
    setLoading(true);
    try {
      const response = await contactService.getMyEnquiries();
      // Most robust extraction: look for data array anywhere in the response
      const rawData = response.data || response;
      const enquiriesList = Array.isArray(rawData) ? rawData : (rawData.data && Array.isArray(rawData.data) ? rawData.data : []);
      setEnquiries(enquiriesList);
    } catch (error) {
      toast.error('Failed to load your enquiries');
      setEnquiries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEnquiries();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-background-light min-h-screen py-24 md:py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-secondary font-black tracking-[0.2em] uppercase text-sm mb-4 block">Track Your Requests</span>
          <h1 className="mb-6 leading-tight">Your <span className="text-secondary italic">Enquiry</span> History</h1>
          <p className="text-xl text-gray-600 leading-relaxed font-medium max-w-2xl mx-auto">
            Stay updated on the status of your admissions, volunteering, and general enquiries.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center py-20">
             <RefreshCw className="w-12 h-12 text-primary animate-spin mb-6" />
             <p className="font-black uppercase tracking-widest text-gray-400 text-xs">Fetching your records...</p>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="bg-white rounded-[4rem] shadow-premium p-20 text-center border border-white">
             <MessageSquare className="w-20 h-20 text-accent/20 mx-auto mb-8" />
             <h3 className="text-3xl font-serif font-black text-primary mb-4">No Requests Found</h3>
             <p className="text-gray-500 font-medium mb-10 max-w-md mx-auto">You haven't submitted any enquiries with this email address yet.</p>
             <a href="/contact" className="btn-primary !rounded-full">Contact NGO Now</a>
          </div>
        ) : (
          <div className="space-y-8">
            {enquiries.map((enq, i) => (
              <motion.div 
                key={enq._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[3rem] p-10 md:p-12 shadow-premium border border-white hover:border-primary/20 transition-all group"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                   <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-[1.5rem] bg-primary/5 flex items-center justify-center text-primary">
                         {enq.enquiryType === 'Admission' ? <Calendar className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
                      </div>
                      <div>
                         <h3 className="text-2xl font-serif font-black text-primary">{enq.enquiryType} Request</h3>
                         <div className="text-xs text-gray-400 font-bold flex items-center gap-2 mt-1">
                            <Clock className="w-3.5 h-3.5" /> Submitted on {formatDate(enq.createdAt)}
                         </div>
                      </div>
                   </div>
                   <div className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${
                     enq.status === 'Resolved' ? 'bg-green-100 text-green-700' : 
                     enq.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 
                     'bg-red-100 text-red-700'
                   }`}>
                      {enq.status === 'Resolved' && <CheckCircle2 className="w-4 h-4" />}
                      {enq.status === 'In Progress' && <RefreshCw className="w-4 h-4" />}
                      {enq.status === 'New' && <AlertCircle className="w-4 h-4" />}
                      {enq.status}
                   </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-10">
                   <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 ml-2">Your Message</label>
                      <div className="p-8 bg-background-light rounded-[2.5rem] border border-gray-50 text-gray-600 font-medium italic leading-relaxed">
                         "{enq.message}"
                      </div>
                   </div>
                   
                   <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 ml-2">NGO Response</label>
                      {enq.reply ? (
                        <div className="p-8 bg-primary/5 rounded-[2.5rem] border border-primary/10 text-primary font-bold leading-relaxed relative overflow-hidden">
                           <div className="absolute top-0 right-0 p-4 opacity-10">
                              <CheckCircle2 className="w-12 h-12" />
                           </div>
                           {enq.reply}
                           <div className="text-[9px] uppercase tracking-widest text-primary/40 mt-6 block">
                              Replied on {formatDate(enq.repliedAt || enq.updatedAt)}
                           </div>
                        </div>
                      ) : (
                        <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-dashed border-gray-200 text-gray-400 font-bold italic flex flex-col items-center justify-center h-full min-h-[150px]">
                           <Clock className="w-8 h-8 mb-4 opacity-30" />
                           Awaiting official response...
                        </div>
                      )}
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default UserEnquiries;
