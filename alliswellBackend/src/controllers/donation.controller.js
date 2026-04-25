import { Donation } from '../models/donationSchema.js';

export const createDonation = async (req, res) => {
  try {
    const donation = await Donation.create(req.body);
    res.status(201).json({ status: 'success', data: donation });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

export const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ date: -1 });
    res.status(200).json({ status: 'success', count: donations.length, data: donations });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

export const getDonationStats = async (req, res) => {
  try {
    const stats = await Donation.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);
    res.status(200).json({ status: 'success', data: stats[0] || { totalAmount: 0, count: 0 } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
