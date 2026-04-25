import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Heart, ListCollapse, Calendar, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { contactService } from '../../../services/contact.service';
import { residentService } from '../../../services/resident.service';
import { eventService } from '../../../services/event.service';

const StatCard = ({ title, value, icon, color, trend, trendValue }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-[2.5rem] shadow-premium border border-gray-50 flex flex-col justify-between"
  >
    <div className="flex justify-between items-start mb-6">
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
        {icon}
      </div>
      {trend && (
        <div className={`flex items-center text-xs font-black uppercase tracking-widest ${trend === 'up' ? 'text-green-500' : 'text-secondary'}`}>
          {trend === 'up' ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
          {trendValue}
        </div>
      )}
    </div>
    <div>
      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">{title}</h3>
      <div className="text-4xl font-serif font-black text-primary">{value}</div>
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    enquiries: 0,
    residents: 0,
    events: 0,
    recentEnquiries: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [enqRes, resRes, evRes] = await Promise.all([
          contactService.getAllEnquiries(),
          residentService.getAllResidents(),
          eventService.getAllEvents()
        ]);

        setStats({
          enquiries: enqRes.data?.length || 0,
          residents: resRes.data?.length || 0,
          events: evRes.data?.length || 0,
          recentEnquiries: (enqRes.data || []).slice(0, 5)
        });
      } catch (error) {
        console.error("Dashboard data fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <div className="p-20 text-center font-black uppercase tracking-widest text-gray-400">Syncing System Data...</div>;

  return (
    <div className="space-y-12">
      {/* Welcome Section */}
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center text-white shadow-premium">
          <Activity className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-4xl font-serif font-black text-primary">System <span className="text-secondary italic">Overview</span></h1>
          <p className="text-gray-500 font-medium mt-1">Real-time pulse of All Is Well Foundation management.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard 
          title="Active Residents" 
          value={stats.residents} 
          icon={<Users className="w-7 h-7" />} 
          color="bg-primary" 
        />
        <StatCard 
          title="Total Enquiries" 
          value={stats.enquiries} 
          icon={<ListCollapse className="w-7 h-7" />} 
          color="bg-secondary" 
        />
        <StatCard 
          title="Total Events" 
          value={stats.events} 
          icon={<Calendar className="w-7 h-7" />} 
          color="bg-accent-dark" 
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Recent Enquiries */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 shadow-premium border border-gray-50">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl md:text-2xl font-serif font-black text-primary">Recent <span className="text-secondary italic">Enquiries</span></h3>
            <Link to="/admin/enquiries" className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-secondary transition-colors">View All</Link>
          </div>
          <div className="space-y-6">
            {stats.recentEnquiries.map((enq, i) => (
              <div key={i} className="flex items-center justify-between p-6 bg-background-light rounded-3xl border border-gray-100 hover:border-primary/20 transition-all group">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary font-black shadow-soft group-hover:bg-primary group-hover:text-white transition-all">
                    {enq.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-black text-gray-900">{enq.name}</div>
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">{enq.enquiryType}</div>
                  </div>
                </div>
                <div className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${enq.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-secondary/10 text-secondary'}`}>
                  {enq.status || 'New'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="self-start bg-primary rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-10 text-white shadow-premium relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20" />
           <h3 className="text-2xl font-serif font-black mb-8 relative z-10 italic text-background-light">Quick Actions</h3>
           <div className="space-y-4 relative z-10">
              <Link to="/admin/residents" className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all text-left px-8 flex items-center justify-between group">
                Add New Resident <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
              <Link to="/admin/events" className="w-full py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all text-left px-8 flex items-center justify-between group">
                Create Event <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
