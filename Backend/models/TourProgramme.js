const mongoose = require('mongoose');

const DaySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  route1: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
  route2: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
  route3: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
  remark: String,
  jointWorkWith: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  approvedAt: Date,
}, { _id: false });

const TourProgrammeSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  days: [DaySchema],
}, { timestamps: true });

module.exports = mongoose.model('TourProgramme', TourProgrammeSchema); 