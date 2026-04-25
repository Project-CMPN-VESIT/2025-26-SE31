import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Star, Trash2, User, RefreshCw } from 'lucide-react';
import { reviewService } from '../../../services/review.service';

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ))}
  </div>
);

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await reviewService.getAllReviews();
      const rawData = response.data || response;
      const dataList = Array.isArray(rawData) ? rawData : (rawData.data && Array.isArray(rawData.data) ? rawData.data : []);
      setReviews(dataList);
    } catch (error) {
      toast.error('Failed to load reviews');
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
      : '—';

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Reviews</h1>
          {!loading && reviews.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {reviews.length} review{reviews.length !== 1 ? 's' : ''} · Average rating:&nbsp;
              <span className="font-semibold text-yellow-500">{averageRating} ★</span>
            </p>
          )}
        </div>
        <button
          onClick={fetchReviews}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading reviews…</div>
        ) : reviews.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No reviews found yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Comment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reviews.map((review) => (
                  <tr key={review._id || review.id} className="hover:bg-gray-50">
                    {/* User */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold flex-shrink-0">
                          {(review.user?.name || review.name || 'U').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {review.user?.name || review.name || 'Anonymous'}
                          </div>
                          {(review.user?.email || review.email) && (
                            <div className="text-xs text-gray-500">
                              {review.user?.email || review.email}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Rating */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StarRating rating={review.rating} />
                      <span className="text-xs text-gray-500 mt-1 block">{review.rating}/5</span>
                    </td>

                    {/* Comment */}
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700 line-clamp-3 max-w-sm">
                        {review.comment || review.review || '—'}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(review.createdAt)}
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

export default AdminReviews;
