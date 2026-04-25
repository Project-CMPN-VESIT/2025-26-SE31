import api from './api';

export const feedbackService = {
  getPublicFeedback: async () => {
    const response = await api.get('/feedback');
    return response.data;
  },

  submitFeedback: async (feedbackData) => {
    // { title, thoughts, type, shareOnWall }
    const response = await api.post('/feedback', feedbackData);
    return response.data;
  }
};
