const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Empleado = require('../models/Empleado');

const router = express.Router();

function respondWithError(res, error) {
  const isClientError = error instanceof mongoose.Error.ValidationError
    || error instanceof mongoose.Error.CastError;

  console.error('Error en rutas de empleados:', error.message);
  return res.status(isClientError ? 400 : 500).json({
    mensaje: isClientError ? error.message : 'Error interno del servidor.',
  });
}

router.get('/', async (req, res) => {
  try {
    await connectDB();
    const empleados = await Empleado.find();
    res.json(empleados);
  } catch (error) {
    return respondWithError(res, error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    await connectDB();
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado.' });
    }
    res.json(empleado);
  } catch (error) {
    return respondWithError(res, error);
  }
});

router.post('/', async (req, res) => {
  try {
    await connectDB();
    const empleado = await Empleado.create(req.body);
    res.status(201).json(empleado);
  } catch (error) {
    return respondWithError(res, error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    await connectDB();
    const empleado = await Empleado.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!empleado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado.' });
    }
    res.json(empleado);
  } catch (error) {
    return respondWithError(res, error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await connectDB();
    const empleado = await Empleado.findByIdAndDelete(req.params.id);
    if (!empleado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado.' });
    }
    res.status(204).end();
  } catch (error) {
    return respondWithError(res, error);
  }
});

module.exports = router;