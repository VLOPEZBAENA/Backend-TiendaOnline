const mongoose = require('mongoose');

const empleadoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  cargo: {
    type: String,
    trim: true,
  },
  salario: {
    type: Number,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Empleado', empleadoSchema);
