const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true, unique: true },
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['employee', 'manager', 'admin'], default: 'employee' },
  active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema); 