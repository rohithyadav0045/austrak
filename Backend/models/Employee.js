const mongoose = require('mongoose');

const headQtrOptions = [
  'AKOLA', 'ANANTHAPUR', 'ASANSOL', 'AURANGABAD', 'BALANGIR', 'BALASORE', 'BANGALORE', 'BARIPADA',
  'BARMER', 'Belgaum', 'BELGHORIA', 'BERHAMPUR', 'BHANDUP', 'BHAYANDAR', 'BHOPAL', 'BHUBANESWAR',
  'BILASPUR', 'BOKARO', 'BRAHMAPUR', 'BURDWAN', 'CENTRAL DELHI', 'CHAKDAHA', 'CHENNAI', 'CHOOLAI',
  'COCHIN', 'GUWAHATI', 'GUNTUR', 'GULBARGA', 'GOREGAON', 'GORAKHPUR', 'Ghaziabad', 'GEO DEMO',
  'GAYA', 'FARIDABAD', 'FAIZABAD', 'ELAMPILLAI', 'EAST DELHI', 'DUM DUM CANTONMENT', 'DUM DUM',
  'DOMJUR', 'DILSUKHNAGAR', 'DIAMOND HARBOUR', 'DHANBAD', 'DEOGHAR', 'DELHI', 'Davanagere',
  'CUTTACK', 'CONTAI', 'COIMBATORE'
];

const staffTypeOptions = [
  'TBE/BM', 'ASO', 'ASM', 'RM', 'SR.RM', 'ZM', 'SR.ZM', 'SM', 'NSM', 'MD', 'ADMIN'
];

const designationOptions = [
  'AREA MANAGER', 'AREA SALES MANAGER', 'AREA SALES MANGAER', 'AREA SALES MANGAGER',
  'AREA SALES OFFICE', 'AREA SALES OFFICER', 'BUSINESS MANAGER', 'BUSSINESS MANAGER',
  'KEY ACCOUNTS MANAGER', 'MANAGING DIRECTOR', 'MARKETING REPRESENTATIVE',
  'NATIONAL SALES MANAGER', 'REGIONAL MANAGER', 'SALES MANAGER', 'SENIOR MANAGER'
];

const divisionGroupOptions = [
  'ALL DIVISION GROUP', 'AUSTRAK GROUP', 'NEPHRO GROUP', 'SHERINGS GROUP'
];

const departmentOptions = [
  'Marketing', 'Field Staff'
];

const genderOptions = ['Male', 'Female'];

const EmployeeSchema = new mongoose.Schema({
  employeeName: { type: String, required: true },
  employeeCode: { type: String, required: true },
  headQtr: { type: String, enum: headQtrOptions, required: true },
  stateName: { type: String, required: true },
  staffType: { type: String, enum: staffTypeOptions, required: true },
  designation: { type: String, enum: designationOptions, required: true },
  divisionGroup: { type: String, enum: divisionGroupOptions, required: true },
  dateOfJoining: { type: Date, required: true },
  temporaryOrWaiting: { type: Boolean, default: false },
  department: { type: String, enum: departmentOptions, required: true },
  panNo: { type: String, required: true },
  addressLine1: String,
  addressLine2: String,
  addressLine3: String,
  addressLine4: String,
  city: { type: String, enum: headQtrOptions },
  pin: String,
  dobCertificate: { type: Date, required: true },
  dobActual: Date,
  dateOfMarriage: Date,
  dateOfResignation: Date,
  dateOfStopTrans: Date,
  gender: { type: String, enum: genderOptions },
  fatherOrSpouse: String,
  employeeCodeMachine: String,
  phone: String,
  mobile: String,
  email: String,
  aadharNo: String,
  phoneNoResi: String,
  otherEmail: String,
  payrollCompany: String,
  doc: Date,
  experience: String,
  maritalStatus: String,
  grade: String,
  permanentAddress: String,
  employeeState: String,
  qualification: String,
  metroNonMetro: String,
  bloodGroup: String,
  birthProof: String,
  expenseType: String,
  remark: String,
  image: String // file path or URL
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema); 