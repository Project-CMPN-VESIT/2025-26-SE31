import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { eventService } from '../../../services/event.service';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [removedImages, setRemovedImages] = useState([]);
  
  const { register, handleSubmit, reset, setValue, formState: { isSubmitting } } = useForm();

  // Load events
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await eventService.getAllEvents();
      const rawData = response.data || response;
      const dataList = Array.isArray(rawData) ? rawData : (rawData.data && Array.isArray(rawData.data) ? rawData.data : []);
      setEvents(dataList);
    } catch (error) {
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openForm = (event = null) => {
    setEditingEvent(event);
    setRemovedImages([]);
    if (event) {
      setValue('title', event.title);
      setValue('description', event.description);
      setValue('location', event.location || '');
      setValue('startDate', event.startDate ? new Date(event.startDate).toISOString().split('T')[0] : '');
      setValue('endDate', event.endDate ? new Date(event.endDate).toISOString().split('T')[0] : '');
      // images are handled separately in state or ref if needed
    } else {
      reset();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
    setRemovedImages([]);
    reset();
  };

  const handleRemoveImage = (imgUrl) => {
    if(!removedImages.includes(imgUrl)){
      setRemovedImages([...removedImages, imgUrl]);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('location', data.location);
      formData.append('startDate', data.startDate);
      if (data.endDate) formData.append('endDate', data.endDate);
      
      // Append files
      if (data.images && data.images.length > 0) {
        for (let i = 0; i < data.images.length; i++) {
          formData.append('images', data.images[i]);
        }
      }

      if (editingEvent) {
        if(removedImages.length > 0){
          formData.append('removedImages', JSON.stringify(removedImages));
        }
        await eventService.updateEvent(editingEvent._id || editingEvent.id, formData);
        toast.success('Event updated successfully');
      } else {
        await eventService.createEvent(formData);
        toast.success('Event created successfully');
      }

      closeModal();
      fetchEvents();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Action failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      try {
        await eventService.deleteEvent(id);
        toast.success('Event deleted');
        fetchEvents();
      } catch (error) {
        toast.error('Failed to delete event');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
         <h1 className="text-2xl font-bold text-gray-900">Manage Events</h1>
         <button onClick={() => openForm()} className="btn-primary rounded-lg text-sm px-4 py-2 flex items-center shadow-sm">
           <Plus className="w-4 h-4 mr-2" /> Add New Event
         </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No events found. Create the first one!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event) => (
                  <tr key={event._id || event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{event.title}</div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center">
                         <ImageIcon className="w-3 h-3 mr-1" /> {event.images?.length || 0} images
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(event.startDate).toLocaleDateString()}
                        {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString()}`}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 line-clamp-2 max-w-xs">{event.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                      <button onClick={() => openForm(event)} className="text-primary hover:text-primary-dark transition-colors border px-2 py-1 rounded bg-blue-50">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(event._id || event.id)} className="text-red-600 hover:text-red-900 transition-colors border px-2 py-1 rounded bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Create/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" onClick={closeModal}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-bold text-gray-900" id="modal-title">
                  {editingEvent ? 'Edit Event' : 'Create New Event'}
                </h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="px-4 py-5 sm:p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border" {...register('title', { required: true })} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border resize-none" {...register('description', { required: true })}></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border" placeholder="Enter location" {...register('location', { required: true })} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Start Date</label>
                      <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border" {...register('startDate', { required: true })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">End Date (Optional)</label>
                      <input type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm px-3 py-2 border" {...register('endDate')} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Upload New Images (Multiple)</label>
                    <input type="file" multiple accept="image/*" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" {...register('images')} />
                  </div>

                  {editingEvent && editingEvent.images && editingEvent.images.length > 0 && (
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">Existing Images</label>
                       <div className="flex gap-2 overflow-x-auto py-2">
                         {editingEvent.images.map((img, i) => {
                           const imgUrl = img.url || img;
                           const isRemoved = removedImages.includes(imgUrl);
                           return (
                             <div key={i} className={`relative w-24 h-24 rounded overflow-hidden flex-shrink-0 ${isRemoved ? 'opacity-30 border-2 border-red-500' : 'border border-gray-200'}`}>
                               <img src={imgUrl} alt="Event" className="w-full h-full object-cover" />
                               {!isRemoved && (
                                 <button type="button" onClick={() => handleRemoveImage(imgUrl)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-80 hover:opacity-100">
                                   <X className="w-3 h-3" />
                                 </button>
                               )}
                             </div>
                           );
                         })}
                       </div>
                       {removedImages.length > 0 && <p className="text-xs text-red-500 mt-1">Highlighted images will be deleted upon saving.</p>}
                     </div>
                  )}

                </div>
                
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-xl border-t border-gray-100">
                  <button type="submit" disabled={isSubmitting} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50">
                    {isSubmitting ? 'Saving...' : 'Save Details'}
                  </button>
                  <button type="button" onClick={closeModal} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Cancel
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
