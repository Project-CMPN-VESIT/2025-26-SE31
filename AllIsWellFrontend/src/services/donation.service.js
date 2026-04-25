import api from './api';

export const donationService = {
  createDonation: async (data) => {
    const response = await api.post('/donation/create', data);
    return response.data;
  },
  getAllDonations: async () => {
    const response = await api.get('/donation/all');
    return response.data;
  },
  getStats: async () => {
    const response = await api.get('/donation/stats');
    return response.data;
  }
};
