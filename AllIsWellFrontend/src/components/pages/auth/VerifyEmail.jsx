import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { authService } from '../../../services/auth.service';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage("No verification token found.");
      return;
    }

    const verify = async () => {
      try {
        const response = await authService.verifyEmail(token);
        setStatus('success');
        setMessage(response.message || "Email verified successfully");
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.message || "Verification failed. The token may be invalid or expired.");
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center">
        {status === 'loading' && (
          <div className="flex flex-col items-center">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying</h2>
            <p className="text-gray-600">{message}</p>
          </div>
        )}
        
        {status === 'success' && (
          <div className="flex flex-col items-center">
            <CheckCircle className="h-16 w-16 text-secondary mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Success!</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <Link to="/login" className="btn-primary w-full">Go to Login</Link>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center">
            <XCircle className="h-16 w-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <Link to="/" className="btn-outline w-full">Return Home</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
