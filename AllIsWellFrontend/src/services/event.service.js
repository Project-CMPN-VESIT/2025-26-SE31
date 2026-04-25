import api from './api';

export const eventService = {
  getAllEvents: async () => {
    const response = await api.get('/event/get-all');
    return response.data;
  },

  createEvent: async (formData) => {
    // formData should be instance of FormData because of multipart/form-data
    const response = await api.post('/event/add-event', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  updateEvent: async (id, formData) => {
    const response = await api.put(`/event/update-event/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  deleteEvent: async (id) => {
    const response = await api.delete(`/event/delete-event/${id}`);
    return response.data;
  }
};
