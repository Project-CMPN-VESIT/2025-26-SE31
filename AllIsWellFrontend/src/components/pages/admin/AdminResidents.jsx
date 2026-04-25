import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, Edit2, Trash2, X, Check, User, Calendar, Home, Activity } from 'lucide-react';
import toast from 'react-hot-toast';
import { residentService } from '../../../services/resident.service';

const AdminResidents = () => {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingResident, setEditingResident] = useState(null);
  const [formData, setFormData] = useState({
    name: '', age: '', admissionDate: '', roomNumber: '', healthNotes: '', status: 'Active'
  });

  const fetchResidents = async () => {
    setLoading(true);
    try {
      const response = await residentService.getAllResidents();
      const rawData = response.data || response;
      const dataList = Array.isArray(rawData) ? rawData : (rawData.data && Array.isArray(rawData.data) ? rawData.data : []);
      setResidents(dataList);
    } catch (error) {
      toast.error('Failed to load residents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResidents();
  }, []);

  const handleOpenModal = (resident = null) => {
    if (resident) {
      setEditingResident(resident);
      setFormData({
        name: resident.name,
        age: resident.age,
        admissionDate: resident.admissionDate.split('T')[0],
        roomNumber: resident.roomNumber,
        healthNotes: resident.healthNotes,
        status: resident.status
      });
    } else {
      setEditingResident(null);
      setFormData({
        name: '', age: '', admissionDate: new Date().toISOString().split('T')[0],
        roomNumber: '', healthNotes: '', status: 'Active'
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingResident) {
        await residentService.updateResident(editingResident._id, formData);
        toast.success('Resident updated successfully');
      } else {
        await residentService.createResident(formData);
        toast.success('Resident added successfully');
      }
      setShowModal(false);
      fetchResidents();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resident record?')) {
      try {
        await residentService.deleteResident(id);
        toast.success('Resident record deleted');
        fetchResidents();
      } catch (error) {
        toast.error('Failed to delete record');
      }
    }
  };

  const filteredResidents = residents.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.roomNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-serif font-black text-primary">Resident <span className="text-secondary italic">Management</span></h1>
          <p className="text-gray-500 font-medium mt-1">Manage and monitor our senior community members.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest flex items-center gap-3 hover:bg-secondary transition-all shadow-premium"
        >
          <Plus className="w-5 h-5" /> Add Resident
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search by name or room..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-8 py-5 bg-white rounded-3xl border border-gray-100 shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
          />
        </div>
      </div>

      {/* Table/Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <div className="col-span-full py-20 text-center font-black uppercase tracking-widest text-gray-400">Loading Community Data...</div>
        ) : filteredResidents.length === 0 ? (
          <div className="col-span-full py-20 text-center font-black uppercase tracking-widest text-gray-400">No residents found</div>
        ) : (
          filteredResidents.map((resident) => (
            <motion.div 
              key={resident._id}
              layout
              className="bg-white rounded-[2.5rem] p-10 shadow-premium border border-gray-50 group hover:border-primary/20 transition-all flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary font-black text-2xl group-hover:bg-primary group-hover:text-white transition-all">
                  {resident.name.charAt(0)}
                </div>
                <div className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${resident.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {resident.status}
                </div>
              </div>
              
              <div className="flex-grow">
                <h3 className="text-2xl font-serif font-black text-primary mb-6">{resident.name}</h3>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-500 text-sm font-bold">
                     <Activity className="w-4 h-4 mr-3 text-secondary" /> Age: {resident.age} years
                  </div>
                  <div className="flex items-center text-gray-500 text-sm font-bold">
                     <Home className="w-4 h-4 mr-3 text-secondary" /> Room: {resident.roomNumber}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm font-bold">
                     <Calendar className="w-4 h-4 mr-3 text-secondary" /> Admitted: {new Date(resident.admissionDate).toLocaleDateString()}
                  </div>
                </div>
                
                {resident.healthNotes && (
                  <div className="mt-8 p-6 bg-background-light rounded-2xl border border-gray-100 text-xs text-gray-500 italic font-medium">
                    "{resident.healthNotes}"
                  </div>
                )}
              </div>

              <div className="mt-10 pt-8 border-t border-gray-50 flex gap-4">
                 <button 
                   onClick={() => handleOpenModal(resident)}
                   className="flex-1 py-3 bg-primary/5 text-primary rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-primary hover:text-white transition-all"
                 >
                   Edit Record
                 </button>
                 <button 
                   onClick={() => handleDelete(resident._id)}
                   className="p-3 text-secondary bg-secondary/5 rounded-xl hover:bg-secondary hover:text-white transition-all"
                 >
                   <Trash2 className="w-4 h-4" />
                 </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-primary/20 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] md:rounded-[3.5rem] shadow-premium relative z-10"
            >
              <div className="p-8 md:p-16">
                <div className="flex justify-between items-center mb-12">
                  <h2 className="text-3xl font-serif font-black text-primary">
                    {editingResident ? 'Update' : 'Add'} <span className="text-secondary italic">Resident</span>
                  </h2>
                  <button onClick={() => setShowModal(false)} className="p-3 bg-gray-100 rounded-2xl hover:bg-secondary hover:text-white transition-all">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-2">Full Name</label>
                      <input 
                        type="text" required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-6 py-4 bg-background-light rounded-2xl border-2 border-gray-100 focus:border-primary focus:outline-none font-bold"
                        placeholder="Enter name"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-2">Age</label>
                      <input 
                        type="number" required
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                        className="w-full px-6 py-4 bg-background-light rounded-2xl border-2 border-gray-100 focus:border-primary focus:outline-none font-bold"
                        placeholder="Enter age here"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-2">Room Number</label>
                      <input 
                        type="text" required
                        value={formData.roomNumber}
                        onChange={(e) => setFormData({...formData, roomNumber: e.target.value})}
                        className="w-full px-6 py-4 bg-background-light rounded-2xl border-2 border-gray-100 focus:border-primary focus:outline-none font-bold"
                        placeholder="Enter room no"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-2">Admission Date</label>
                      <input 
                        type="date" required
                        value={formData.admissionDate}
                        onChange={(e) => setFormData({...formData, admissionDate: e.target.value})}
                        className="w-full px-6 py-4 bg-background-light rounded-2xl border-2 border-gray-100 focus:border-primary focus:outline-none font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-2">Health Notes</label>
                    <textarea 
                      rows="3"
                      value={formData.healthNotes}
                      onChange={(e) => setFormData({...formData, healthNotes: e.target.value})}
                      className="w-full px-6 py-4 bg-background-light rounded-2xl border-2 border-gray-100 focus:border-primary focus:outline-none font-bold resize-none"
                      placeholder="Any medical conditions or special care needs..."
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-2">Status</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-6 py-4 bg-background-light rounded-2xl border-2 border-gray-100 focus:border-primary focus:outline-none font-bold appearance-none"
                    >
                      <option value="Active">Active Resident</option>
                      <option value="Discharged">Discharged</option>
                      <option value="Hospitalized">Hospitalized</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-premium hover:bg-secondary transition-all"
                  >
                    {editingResident ? 'Update Record' : 'Save Resident'}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminResidents;
