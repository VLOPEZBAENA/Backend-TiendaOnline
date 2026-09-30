const express = require('express');
const mongoose = require('mongoose');
const Empleado = require('../models/Empleado');

const router = express.Router();

// GET ALL
router.get('/', async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.json(empleados);
  } catch (error) {
    console.error('❌ Error en GET /:', error);
    res.status(500).json({ mensaje: error.message });
  }
});

// GET BY ID
router.get('/:id', async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado.' });
    }
    res.json(empleado);
  } catch (error) {
    console.error('❌ Error en GET /:id:', error);
    res.status(500).json({ mensaje: error.message });
  }
});

// POST
router.post('/', async (req, res) => {
  try {
    console.log('📥 Body recibido:', req.body);
    const empleado = await Empleado.create(req.body);
    res.status(201).json(empleado);
  } catch (error) {
    console.error('❌ Error detallado al crear:', error);
    res.status(400).json({ 
      mensaje: 'Error al registrar el empleado', 
      detalle: error.message 
    });
  }
});

// PUT
router.put('/:id', async (req, res) => {
  try {
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
    console.error('❌ Error en PUT /:id:', error);
    res.status(400).json({ mensaje: error.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const empleado = await Empleado.findByIdAndDelete(req.params.id);
    if (!empleado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado.' });
    }
    res.status(204).end();
  } catch (error) {
    console.error('❌ Error en DELETE /:id:', error);
    res.status(500).json({ mensaje: error.message });
  }
});

module.exports = router;