import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Search, Filter, Mail, User, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { donationService } from '../../../services/donation.service';

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState({ totalAmount: 0, count: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [donRes, statsRes] = await Promise.all([
        donationService.getAllDonations(),
        donationService.getStats()
      ]);
      
      const rawData = donRes.data || donRes;
      const dataList = Array.isArray(rawData) ? rawData : (rawData.data && Array.isArray(rawData.data) ? rawData.data : []);
      setDonations(dataList);
      setStats(statsRes.data || { totalAmount: 0, count: 0 });
    } catch (error) {
      toast.error('Failed to load donations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredDonations = donations.filter(d => 
    d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12">
      {/* Header & Stats */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-serif font-black text-primary">Donation <span className="text-secondary italic">Tracker</span></h1>
          <p className="text-gray-500 font-medium mt-1">Manage and acknowledge your community sponsors.</p>
        </div>
        
        <div className="bg-primary rounded-[2.5rem] p-8 text-white shadow-premium flex items-center justify-between relative overflow-hidden">
           <div className="relative z-10">
              <div className="text-[10px] font-black uppercase tracking-widest text-accent mb-2">Total Contributions</div>
              <div className="text-4xl font-serif font-black">₹{stats.totalAmount.toLocaleString()}</div>
           </div>
           <TrendingUp className="w-12 h-12 text-white/20 relative z-10" />
           <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search by donor name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-8 py-5 bg-white rounded-3xl border border-gray-100 shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[3rem] shadow-premium border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-20 text-center font-black uppercase tracking-widest text-gray-400">Loading Donation Records...</div>
        ) : filteredDonations.length === 0 ? (
          <div className="p-20 text-center font-black uppercase tracking-widest text-gray-400">No donation records found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-10 py-6 text-left text-xs font-black uppercase tracking-widest text-gray-400">Donor</th>
                  <th className="px-10 py-6 text-left text-xs font-black uppercase tracking-widest text-gray-400">Category</th>
                  <th className="px-10 py-6 text-left text-xs font-black uppercase tracking-widest text-gray-400">Amount</th>
                  <th className="px-10 py-6 text-left text-xs font-black uppercase tracking-widest text-gray-400">Date</th>
                  <th className="px-10 py-6 text-left text-xs font-black uppercase tracking-widest text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredDonations.map((don) => (
                  <tr key={don._id} className="hover:bg-primary/[0.02] transition-colors group">
                    <td className="px-10 py-8 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary font-black group-hover:bg-primary group-hover:text-white transition-all">
                          {don.donorName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-black text-gray-900">{don.donorName}</div>
                          <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                            <Mail className="w-3 h-3" /> {don.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8 whitespace-nowrap">
                       <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 bg-gray-100 px-3 py-1.5 rounded-xl">
                         {don.category}
                       </span>
                    </td>
                    <td className="px-10 py-8 whitespace-nowrap">
                       <div className="text-lg font-serif font-black text-primary">₹{don.amount.toLocaleString()}</div>
                    </td>
                    <td className="px-10 py-8 whitespace-nowrap">
                       <div className="text-xs font-bold text-gray-500">{new Date(don.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    </td>
                    <td className="px-10 py-8 whitespace-nowrap">
                       <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${don.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-secondary/10 text-secondary'}`}>
                         <div className={`w-1.5 h-1.5 rounded-full ${don.status === 'Completed' ? 'bg-green-500' : 'bg-secondary'}`} />
                         {don.status}
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDonations;
