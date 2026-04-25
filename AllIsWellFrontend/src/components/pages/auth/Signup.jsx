import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Heart, User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { authService } from '../../../services/auth.service';

const Signup = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, role: 'user' }; 
      const response = await authService.signup(payload);
      toast.success(response.message || "Signup successful! Check your email for verification.");
      navigate('/verify-email');
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
             <Heart className="h-8 w-8 text-secondary" fill="currentColor" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Join Our Cause</h2>
          <p className="mt-3 text-gray-500">
            Already a member?{' '}
            <Link to="/login" className="font-semibold text-secondary hover:text-secondary-dark transition-colors inline-flex items-center">
              Sign in <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  className={`appearance-none rounded-xl relative block w-full pl-11 px-4 py-3.5 border ${errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-secondary focus:border-secondary'} text-gray-900 focus:outline-none sm:text-sm bg-gray-50/50 hover:bg-white transition-colors`}
                  placeholder="Enter name"
                  {...register('name', { required: "Name is required" })}
                />
              </div>
              {errors.name && <p className="mt-2 text-sm text-red-600 font-medium">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  className={`appearance-none rounded-xl relative block w-full pl-11 px-4 py-3.5 border ${errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-secondary focus:border-secondary'} text-gray-900 focus:outline-none sm:text-sm bg-gray-50/50 hover:bg-white transition-colors`}
                  placeholder="Enter email"
                  {...register('email', { required: "Email is required" })}
                />
              </div>
              {errors.email && <p className="mt-2 text-sm text-red-600 font-medium">{errors.email.message}</p>}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`appearance-none rounded-xl relative block w-full pl-11 pr-12 py-3.5 border ${errors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-secondary focus:border-secondary'} text-gray-900 focus:outline-none sm:text-sm bg-gray-50/50 hover:bg-white transition-colors`}
                  placeholder="••••••••"
                  {...register('password', { 
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" }
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600 font-medium">{errors.password.message}</p>}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-secondary hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-70 transition-all shadow-md shadow-secondary/20"
            >
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </button>
          </div>
          
          <p className="text-xs text-center text-gray-400 mt-4 leading-relaxed">
             By joining, you agree to our terms of service and commit to supporting our senior community.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
