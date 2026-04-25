import api from './api';

export const contactService = {
  submitEnquiry: async (enquiryData) => {
    const response = await api.post('/contact/send', enquiryData);
    return response.data;
  },

  getAllEnquiries: async () => {
    const response = await api.get('/contact/all');
    return response.data;
  },

  getMyEnquiries: async () => {
    const response = await api.get('/contact/my-enquiries');
    return response.data;
  },

  updateStatus: async (id, status, reply = '') => {
    const response = await api.patch(`/contact/status/${id}`, { status, reply });
    return response.data;
  }
};
