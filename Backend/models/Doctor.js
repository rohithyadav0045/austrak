const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  address1: String,
  address2: String,
  address3: String,
  pin: String,
}, { _id: false });

const DoctorSchema = new mongoose.Schema({
  drName: { type: String, required: true },
  speciality: { type: String, required: true },
  route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
  area: { type: String, required: true },
  practiceArea: String,
  mobile: { type: String, required: true },
  gender: { type: String, required: true },
  qualification: { type: String, required: true },
  class: { type: String, required: true },
  visitFrequency: { type: Number, required: true },
  state: { type: String, required: true },
  whatsappNo: String,
  residenceAddress: AddressSchema,
  clinicAddress: AddressSchema,
  email: String,
  phone: String,
  panNo: String,
  homeTown: String,
  drSetupType: { type: String, required: true },
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

module.exports = mongoose.model('Doctor', DoctorSchema); 