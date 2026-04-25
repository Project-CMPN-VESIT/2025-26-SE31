import api from './api';

export const residentService = {
  createResident: async (data) => {
    const response = await api.post('/resident/add', data);
    return response.data;
  },
  getAllResidents: async () => {
    const response = await api.get('/resident/all');
    return response.data;
  },
  updateResident: async (id, data) => {
    const response = await api.put(`/resident/update/${id}`, data);
    return response.data;
  },
  deleteResident: async (id) => {
    const response = await api.delete(`/resident/delete/${id}`);
    return response.data;
  }
};
