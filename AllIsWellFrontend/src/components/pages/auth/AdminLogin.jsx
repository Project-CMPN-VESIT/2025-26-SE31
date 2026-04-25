import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ShieldCheck, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { login, logout } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      // login() returns { userRole, data } — role comes from backend JWT only
      const { userRole } = await login(data);
      if (userRole !== 'admin') {
        toast.error('Access denied. You do not have admin privileges.');
        // Log them out immediately — they are not an admin
        await logout();
        return;
      }
      toast.success('Welcome back, Admin!');
      navigate('/admin');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background-light">
      {/* Decorative glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-md w-full">
        {/* Organization Name */}
        <div className="text-center mb-12">
           <h2 className="text-4xl font-serif font-black text-primary tracking-tight">All Is Well</h2>
           <p className="text-xs font-black text-secondary tracking-[0.4em] uppercase mt-1">Foundation</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-100 rounded-[2.5rem] shadow-premium p-10 space-y-8">
          
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
              <ShieldCheck size={32} className="text-white" />
            </div>
            <h1 className="mt-6 text-3xl font-black text-primary tracking-tight font-serif italic">Admin Portal</h1>
            <p className="mt-2 text-sm font-bold text-gray-400 uppercase tracking-widest">Secure Control Center</p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Email */}
            <div>
              <label htmlFor="admin-email" className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-3 ml-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-primary/40" />
                </div>
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter email"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-background-light border-2 text-gray-900 placeholder-gray-500 focus:outline-none transition-all text-sm font-medium ${
                    errors.email
                      ? 'border-secondary/30 ring-2 ring-secondary/10'
                      : 'border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/5'
                  }`}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' }
                  })}
                />
              </div>
              {errors.email && <p className="mt-2 text-xs text-secondary font-bold ml-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="admin-password" className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-3 ml-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-primary/40" />
                </div>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-12 py-4 rounded-2xl bg-background-light border-2 text-gray-900 placeholder-gray-500 focus:outline-none transition-all text-sm font-medium ${
                    errors.password
                      ? 'border-secondary/30 ring-2 ring-secondary/10'
                      : 'border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/5'
                  }`}
                  {...register('password', { required: 'Password is required' })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-primary transition-colors"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="mt-2 text-xs text-secondary font-bold ml-1">{errors.password.message}</p>}
            </div>

            {/* Submit */}
            <button
              id="admin-login-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 py-5 px-4 rounded-2xl text-sm font-black uppercase tracking-[0.2em] text-white bg-primary hover:bg-primary-dark shadow-premium disabled:opacity-70 transition-all"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <ShieldCheck size={20} />
                  Access Dashboard
                </>
              )}
            </button>
          </form>

          {/* Footer link */}
          <div className="pt-4 text-center">
            <Link to="/login" className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors">
              Go to User Login →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
