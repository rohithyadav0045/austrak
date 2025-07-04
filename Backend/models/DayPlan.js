const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DayPlanSchema = new Schema({
  employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  date: { type: Date, required: true },
  route: { type: Schema.Types.ObjectId, ref: 'Route', required: true },
  isDiverted: { type: Boolean, default: false },
  divertedRoute: { type: Schema.Types.ObjectId, ref: 'Route' },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Approved' },
  jointWorkWith: { type: Schema.Types.ObjectId, ref: 'Employee' },
  workingType: { type: String },
  approvedBy: { type: Schema.Types.ObjectId, ref: 'Employee' },
  approvedAt: { type: Date },
  rejectedBy: { type: Schema.Types.ObjectId, ref: 'Employee' },
  rejectedAt: { type: Date },
  rejectionReason: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('DayPlan', DayPlanSchema); 