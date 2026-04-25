import React, { useEffect, useState } from 'react';
import { Star, MessageCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { reviewService } from '../../../services/review.service';
import { motion } from 'framer-motion';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reviewService.getAllReviews()
      .then(res => setReviews(res.data || []))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs mb-6 hover:text-secondary transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-serif font-black text-primary">Community <span className="text-secondary italic">Voices</span></h1>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-soft flex items-center gap-6">
            <div className="text-center">
              <div className="text-3xl font-black text-primary">{reviews.length}</div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Reviews</div>
            </div>
            <div className="w-px h-10 bg-gray-100" />
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-accent fill-current" />
              <div className="text-2xl font-black text-primary">4.9</div>
            </div>
          </div>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[3rem] shadow-soft border border-primary/5">
             <MessageCircle className="w-16 h-16 text-gray-200 mx-auto mb-6" />
             <p className="text-gray-500 font-medium text-xl">No reviews shared yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <motion.div 
                key={review._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-10 rounded-[3rem] border border-white flex flex-col shadow-soft hover:shadow-premium transition-all duration-500 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 -z-10 group-hover:bg-primary/10 transition-colors" />
                <div className="flex gap-1 mb-8 text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < (review.rating || 5) ? 'fill-current' : 'text-gray-100'}`} />
                  ))}
                </div>
                <p className="text-gray-600 text-lg italic mb-10 leading-relaxed font-serif">"{review.comment}"</p>
                <div className="mt-auto flex items-center gap-5">
                  <div className="w-14 h-14 bg-primary text-white rounded-[1.2rem] flex items-center justify-center font-black text-xl shadow-soft">
                    {(review.user?.name || 'F')[0]}
                  </div>
                  <div>
                    <div className="font-black text-primary uppercase tracking-widest text-xs">{review.user?.name || 'Family Member'}</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                      {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </div>
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

export default Reviews;
