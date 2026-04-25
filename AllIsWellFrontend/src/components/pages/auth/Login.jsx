import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Heart, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const { userRole } = await login(data);
      toast.success('Login successful!');
      if (userRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
             <Heart className="h-8 w-8 text-primary" fill="currentColor" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome back</h2>
          <p className="mt-3 text-gray-500">
            Don't have an account yet?{' '}
            <Link to="/signup" className="font-semibold text-primary hover:text-primary-dark transition-colors inline-flex items-center">
              Join our family <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={`appearance-none rounded-xl relative block w-full pl-11 px-4 py-3.5 border ${errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-primary focus:border-primary'} text-gray-900 focus:outline-none sm:text-sm bg-gray-50/50 hover:bg-white transition-colors`}
                  placeholder="Enter email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' }
                  })}
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
                  autoComplete="current-password"
                  className={`appearance-none rounded-xl relative block w-full pl-11 pr-12 py-3.5 border ${errors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-primary focus:border-primary'} text-gray-900 focus:outline-none sm:text-sm bg-gray-50/50 hover:bg-white transition-colors`}
                  placeholder="••••••••"
                  {...register('password', { required: 'Password is required' })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600 font-medium">{errors.password.message}</p>}
            </div>
          </div>

          <div className="pt-2">
            <button
              id="user-login-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-70 transition-all shadow-md shadow-primary/20"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </div>

          <div className="text-center mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500">
               Foundation Staff?{' '}
              <Link to="/admin-login" className="font-semibold text-gray-700 hover:text-primary transition-colors inline-flex items-center">
                Admin Portal <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
