import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Heart, Home, Calendar, MessageSquare, ListCollapse, LogOut, FileText, ChevronRight, ExternalLink, Users, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../../assets/logo.png';

const AdminLayout = () => {
  const { adminUser, logoutAdmin } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <Home className="w-5 h-5" /> },
    { name: 'Residents', path: '/admin/residents', icon: <Users className="w-5 h-5" /> },
    { name: 'Manage Events', path: '/admin/events', icon: <Calendar className="w-5 h-5" /> },
    { name: 'Manage Enquiries', path: '/admin/enquiries', icon: <ListCollapse className="w-5 h-5" /> },
    { name: 'Manage Documents', path: '/admin/documents', icon: <FileText className="w-5 h-5" /> },
    { name: 'Reviews', path: '/admin/reviews', icon: <MessageSquare className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-background-light flex font-sans selection:bg-primary/10 relative">
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-[45] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`w-72 bg-primary text-white flex flex-col fixed inset-y-0 z-50 shadow-premium overflow-hidden transition-transform duration-500 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Decorative Background for Sidebar */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30L0 0M60 60L30 30' stroke='white' stroke-width='1'/%3E%3C/svg%3E")` }} />
        
        <div className="h-24 flex items-center px-8 relative z-10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-1 bg-white rounded-xl shadow-soft group-hover:rotate-12 transition-transform duration-500 w-10 h-10 flex items-center justify-center overflow-hidden">
              <img src={logoImg} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
               <span className="text-xl font-serif font-black tracking-tight text-white">AIW Admin</span>
               <span className="text-[9px] font-black text-accent uppercase tracking-[0.3em] mt-0.5">Control Panel</span>
            </div>
          </Link>
          {/* Mobile Close Button */}
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden ml-auto p-2 hover:bg-white/10 rounded-xl transition-colors">
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-10 px-6 relative z-10">
          <div className="mb-8 px-4 text-[10px] font-black text-accent/60 uppercase tracking-[0.3em]">Management Hub</div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center justify-between px-5 py-4 text-sm font-bold rounded-2xl transition-all duration-300 group ${
                    isActive ? 'bg-white text-primary shadow-premium' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={isActive ? 'text-primary' : 'text-accent'}>{item.icon}</span>
                    <span className="tracking-wide uppercase text-[11px] font-black">{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-primary" />}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-white/5 relative z-10">
          <div className="flex items-center gap-4 px-4 py-5 mb-4 bg-white/5 rounded-3xl border border-white/10">
            <div className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center text-primary font-black text-lg">
              {adminUser?.name?.charAt(0) || 'A'}
            </div>
            <div className="overflow-hidden">
               <p className="text-xs font-black text-white uppercase tracking-widest truncate">{adminUser?.name || 'Administrator'}</p>
               <p className="text-[10px] text-gray-400 truncate">{adminUser?.email}</p>
            </div>
          </div>
          <button 
            onClick={logoutAdmin}
            className="w-full flex items-center justify-center gap-3 px-4 py-4 text-[11px] font-black uppercase tracking-widest text-secondary bg-secondary/5 border border-secondary/10 rounded-2xl hover:bg-secondary hover:text-white transition-all duration-500 shadow-soft"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72 min-w-0 flex flex-col relative">
        {/* Floating Texture Overlay */}
        <div className="fixed inset-0 opacity-[0.01] pointer-events-none z-[60]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

        <header className="h-24 glass border-b border-gray-100 flex items-center justify-between px-6 md:px-10 sticky top-0 z-40">
           <div className="flex items-center gap-4">
              <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-3 bg-white rounded-2xl shadow-soft border border-gray-100 text-primary">
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex flex-col">
                <h2 className="text-xl md:text-2xl font-serif font-black text-primary tracking-tight">
                  {navItems.find(item => item.path === location.pathname)?.name || 'Overview'}
                </h2>
                <div className="flex items-center gap-2 mt-0.5">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                   <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Active</span>
                </div>
              </div>
           </div>
           
           <div className="flex items-center gap-6">
              <Link to="/" target="_blank" className="text-[10px] md:text-[11px] font-black text-gray-400 hover:text-primary transition-all uppercase tracking-[0.2em] flex items-center gap-2 group">
                 <span className="hidden sm:inline relative">
                    View Live Site
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all" />
                 </span>
                 <ExternalLink className="w-4 h-4" />
              </Link>
           </div>
        </header>

        <div className="p-6 md:p-10 relative z-30 flex-grow">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;
