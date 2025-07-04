const mongoose = require('mongoose');

const FareRateSchema = new mongoose.Schema({
  rate: Number,
  uptoKm: Number,
}, { _id: false });

const ExpenseMasterSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  daType: { type: String, required: true },
  effectFrom: { type: Date, required: true },
  daLocal: Number,
  daEx: Number,
  daOs: Number,
  fareRates: [FareRateSchema], // up to 4
  entryType: { type: String, default: 'Manual' },
  headQtr: String,
  state: String,
  staffType: String,
  designation: String,
  history: [Object],
}, { timestamps: true });

module.exports = mongoose.model('ExpenseMaster', ExpenseMasterSchema); 