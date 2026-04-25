import api from './api';

export const reviewService = {
  getAllReviews: async () => {
    const response = await api.get('/review/all');
    return response.data;
  },

  createReview: async (reviewData) => {
    // { rating: number, comment: string }
    const response = await api.post('/review/add-review', reviewData);
    return response.data;
  }
};
