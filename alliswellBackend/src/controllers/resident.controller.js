import { Resident } from '../models/residentSchema.js';

export const createResident = async (req, res) => {
  try {
    const resident = await Resident.create(req.body);
    res.status(201).json({ status: 'success', data: resident });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

export const getAllResidents = async (req, res) => {
  try {
    const residents = await Resident.find().sort({ admissionDate: -1 });
    res.status(200).json({ status: 'success', count: residents.length, data: residents });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

export const updateResident = async (req, res) => {
  try {
    const resident = await Resident.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!resident) return res.status(404).json({ status: 'fail', message: 'Resident not found' });
    res.status(200).json({ status: 'success', data: resident });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

export const deleteResident = async (req, res) => {
  try {
    const resident = await Resident.findByIdAndDelete(req.params.id);
    if (!resident) return res.status(404).json({ status: 'fail', message: 'Resident not found' });
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
