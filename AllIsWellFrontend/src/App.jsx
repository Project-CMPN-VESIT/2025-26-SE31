import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import Login from './components/pages/auth/Login';
import AdminLogin from './components/pages/auth/AdminLogin';
import Signup from './components/pages/auth/Signup';
import VerifyEmail from './components/pages/auth/VerifyEmail';
import Reviews from './components/pages/public/Reviews';
import Home from './components/pages/public/Home.jsx';
import About from './components/pages/public/About';
import Services from './components/pages/public/Services';
import Activities from './components/pages/public/Activities';
import OurThought from './components/pages/public/OurThought';
import EventsListing from './components/pages/public/EventsListing';
import Documents from './components/pages/public/Documents';
import DocumentPreview from './components/pages/public/DocumentPreview';
import Contact from './components/pages/public/Contact';
import UserEnquiries from './components/pages/public/UserEnquiries';
import AdminLayout from './components/layout/AdminLayout';
import AdminEvents from './components/pages/admin/AdminEvents';
import AdminReviews from './components/pages/admin/AdminReviews';
import ManageDocuments from './components/pages/admin/ManageDocuments';
import AdminEnquiries from './components/pages/admin/AdminEnquiries';
import Admissions from './components/pages/public/Admissions';
import Volunteer from './components/pages/public/Volunteer';
import AdminDashboard from './components/pages/admin/AdminDashboard';
import AdminResidents from './components/pages/admin/AdminResidents';
import ScrollToTop from './components/ScrollToTop';

const Placeholder = ({ title }) => <div className="p-8 text-2xl text-center">{title}</div>;

const ProtectedRoute = ({ children, requireAdmin }) => {
  const { user, adminUser, loading } = useAuth();
  
  if (loading) return <div className="p-8 text-center text-gray-500">Loading Session...</div>;
  
  if (requireAdmin) {
    if (!adminUser) return <Navigate to="/admin-login" replace />;
    return children;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster position="top-right" />
        
        <Routes>
          {/* Public Routes with Layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/our-thought" element={<OurThought />} />
            <Route path="/events" element={<EventsListing />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/documents/preview/:id" element={<DocumentPreview />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/my-enquiries" element={<ProtectedRoute><UserEnquiries /></ProtectedRoute>} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/reviews" element={<Reviews />} />
          </Route>

          <Route path="/admin" element={<ProtectedRoute requireAdmin={true}><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="residents" element={<AdminResidents />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
            <Route path="documents" element={<ManageDocuments />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
