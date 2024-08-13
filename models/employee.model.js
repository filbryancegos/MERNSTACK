const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  employeeId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  position: { type: String, required: true },
  salary: { type: Number, required: true },
}, {
  timestamps: true,
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
