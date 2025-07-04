const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  source: { type: String, required: true },
  via1: String,
  via2: String,
  via3: String,
  via4: String,
  routeName: { type: String, required: true },
  description: String,
  daType: { type: String, required: true },
  kmSingleSide: Number,
  daRatePerDay: Number,
  noOfVisitInMonth: Number,
  additionalAllowanceHead: String,
  amount: Number,
  approved: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Route', RouteSchema); 