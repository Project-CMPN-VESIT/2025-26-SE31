import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Heart, Menu, X, Phone, Mail, MapPin, ArrowRight, Instagram, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../../assets/logo.png';

const MainLayout = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();
  const isAdminLogin = location.pathname === '/admin-login';

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  React.useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Activities', path: '/activities' },
    { name: 'Our Thought', path: '/our-thought' },
    { name: 'Events', path: '/events' },
    { name: 'Documents', path: '/documents' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background-light selection:bg-primary/10 selection:text-primary relative">
      {/* Global Texture Overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none z-50" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* Navbar */}
      {!isAdminLogin && (
        <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'py-3' : 'py-6'}`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className={`relative transition-all duration-500 rounded-[2rem] px-8 flex justify-between items-center h-20 ${scrolled ? 'glass shadow-premium border-white/40' : 'bg-transparent'}`}>
              <div className="flex items-center">
                <Link to="/" className="flex items-center gap-3 group">
                  <motion.div 
                    className="p-1 bg-white rounded-2xl shadow-soft group-hover:rotate-12 transition-transform duration-500 overflow-hidden w-12 h-12 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <img src={logoImg} alt="Logo" className="w-full h-full object-contain" />
                  </motion.div>
                  <div className="flex flex-col">
                    <span className="text-xl md:text-2xl font-serif font-black text-primary tracking-tight leading-none">All Is Well</span>
                    <span className="text-[10px] font-black text-secondary tracking-[0.3em] uppercase mt-1">Foundation</span>
                  </div>
                </Link>
              </div>
              
              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path}
                    to={link.path} 
                    className={`px-4 py-2 text-[13px] font-black uppercase tracking-widest transition-all relative group ${location.pathname === link.path ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}
                  >
                    {link.name}
                    {location.pathname === link.path && (
                      <motion.div 
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent rounded-full"
                      />
                    )}
                  </Link>
                ))}
                
                <div className="h-6 w-px bg-gray-200 mx-6 opacity-50" />
                
                <div className="flex items-center gap-4">
                  {user ? (
                    <div className="flex items-center gap-4 bg-background-light p-1.5 pr-4 rounded-2xl border border-gray-100">
                      <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black">
                        {user.name[0]}
                      </div>
                      <div className="flex flex-col">
                         <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{user.name}</span>
                         <div className="flex gap-3">
                            <Link to="/my-enquiries" className="text-[10px] font-black text-primary hover:text-secondary uppercase tracking-widest">My Requests</Link>
                            <button onClick={logout} className="text-[10px] font-black text-secondary hover:text-secondary-dark uppercase tracking-widest">Logout</button>
                         </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-6">
                      <Link to="/login" className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors">Login</Link>
                      <a 
                        href="https://all-is-well-foundation.danamojo.org/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-primary !py-3 !px-8 !text-xs !rounded-full shadow-premium flex items-center gap-2 group overflow-hidden"
                      >
                        <span className="relative z-10">Donate</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="flex items-center lg:hidden">
                <button onClick={() => setMenuOpen(!menuOpen)} className="p-3 text-primary bg-white/50 backdrop-blur-sm rounded-2xl border border-white shadow-soft transition-all">
                  {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="lg:hidden absolute top-28 left-6 right-6 z-[110]"
              >
                <div className="glass rounded-[3rem] p-10 shadow-premium border-white/60">
                  <div className="flex flex-col gap-6 text-center">
                    {navLinks.map((link) => (
                      <Link 
                        key={link.path}
                        to={link.path} 
                        className={`text-xl font-serif font-black tracking-tight ${location.pathname === link.path ? 'text-secondary italic' : 'text-primary'}`}
                      >
                        {link.name}
                      </Link>
                    ))}
                    <div className="h-px bg-primary/5 my-4" />
                    <a 
                      href="https://all-is-well-foundation.danamojo.org/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-primary !py-5 rounded-3xl"
                    >
                      Donate to Foundation
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      )}

      {/* Main Content Area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      {!isAdminLogin && (
        <footer className="bg-primary pt-32 pb-16 relative overflow-hidden">
          {/* Abstract Background Shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-24">
              <div className="lg:col-span-5">
                <Link to="/" className="flex items-center gap-4 mb-10 group">
                  <div className="p-2 bg-white rounded-2xl shadow-soft group-hover:rotate-12 transition-transform duration-500 w-16 h-16 flex items-center justify-center overflow-hidden">
                    <img src={logoImg} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-serif font-black text-white tracking-tight">All Is Well</span>
                    <span className="text-[10px] font-black text-accent tracking-[0.4em] uppercase mt-1">Foundation</span>
                  </div>
                </Link>
                <p className="text-gray-400 text-xl leading-relaxed mb-12 font-serif italic max-w-md">
                  "Where wisdom is celebrated, and every heart finds a home."
                </p>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-primary transition-all duration-500">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="https://www.instagram.com/alliswellfoundation17?igsh=b2hzMDBkdTA3OGVq" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:text-primary transition-all duration-500">
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-accent mb-10">Navigation</h4>
                <ul className="space-y-5">
                  {['About', 'Services', 'Activities', 'Events'].map((link) => (
                    <li key={link}>
                      <Link to={`/${link.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest">{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="lg:col-span-5">
                <div className="bg-white/5 rounded-[3rem] p-10 md:p-12 border border-white/10">
                  <h4 className="text-[10px] font-black tracking-[0.4em] uppercase text-accent mb-10">Contact Us</h4>
                  <div className="space-y-8">
                    <div className="flex gap-6 items-start">
                      <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-white text-lg font-medium leading-relaxed">Ulwe, Sector 19, Navi Mumbai, India</p>
                    </div>
                    <div className="flex gap-6 items-center">
                      <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <a href="tel:+919167270994" className="text-white text-lg font-medium hover:text-accent transition-colors">+91 91672 70994</a>
                    </div>
                    <div className="flex gap-6 items-center">
                      <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <a href="mailto:alliswellfoundation.india@gmail.com" className="text-white text-lg font-medium hover:text-accent transition-colors break-all">alliswellfoundation.india@gmail.com</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-10">
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] text-center md:text-left">
                &copy; {new Date().getFullYear()} All Is Well Foundation. Hand-crafted with respect.
              </p>
              <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.2em]">
                <Link to="/privacy" className="text-gray-500 hover:text-accent transition-colors">Privacy</Link>
                <Link to="/terms" className="text-gray-500 hover:text-accent transition-colors">Terms</Link>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default MainLayout;
