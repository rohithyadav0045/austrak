const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  address1: String,
  address2: String,
  address3: String,
  pin: String,
}, { _id: false });

const ChemistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
  area: { type: String, required: true },
  practiceArea: String,
  mobile: { type: String, required: true },
  gender: String,
  visitFrequency: Number,
  state: String,
  whatsappNo: String,
  residenceAddress: AddressSchema,
  shopAddress: AddressSchema,
  email: String,
  phone: String,
  panNo: String,
  homeTown: String,
  drSetupType: String,
  institutionHosp2: String,
  prescribe: String,
  addDate: { type: Date, default: Date.now },
  rejectedRemark: String,
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  approved: { type: Boolean, default: false },
  coordinates: {
    lat: Number,
    lng: Number
  },
}, { timestamps: true });

module.exports = mongoose.model('Chemist', ChemistSchema); 