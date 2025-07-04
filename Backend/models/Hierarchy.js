const mongoose = require('mongoose');

const staffTypes = [
  'TBE/BM', 'ASO', 'ASM', 'RM', 'SR.RM', 'ZM', 'SR.ZM', 'SM', 'NSM', 'MD', 'ADMIN'
];

const allocationsSchema = {};
staffTypes.forEach(type => {
  allocationsSchema[type] = { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', default: null };
});

const HierarchySchema = new mongoose.Schema({
  headQtr: { type: String, required: true, unique: true },
  allocations: allocationsSchema
});

module.exports = mongoose.model('Hierarchy', HierarchySchema); 