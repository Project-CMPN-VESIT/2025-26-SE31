import api from './api';
 
const BASE_ROUTE = '/document';
 
export const documentService = {
    getAllDocuments: () => api.get(`${BASE_ROUTE}/all`),
 
    getDocumentById: (id) => api.get(`${BASE_ROUTE}/${id}`),
 
    getPreviewUrl: (id) => `http://localhost:5000${BASE_ROUTE}/preview/${id}`,
 
    uploadDocument: (formData) => api.post(`${BASE_ROUTE}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }),
 
    deleteDocument: (id) => api.delete(`${BASE_ROUTE}/${id}`)
};