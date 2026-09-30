require('dotenv').config();
const express = require('express');
const cors = require('cors');
const empleadosRouter = require('./routes/empleados');

const app = express();

app.use(cors());
app.use(express.json());

// 1. Ruta raíz de bienvenida y verificación del servidor
app.get('/', (req, res) => {
  res.json({
    estado: 'API Activa',
    mensaje: 'Servidor Express corriendo correctamente en Vercel 🚀',
    rutasDisponibles: {
      empleados: '/api/empleados'
    }
  });
});

// 2. Definición de rutas de la API
app.use('/api/empleados', empleadosRouter);

// 3. Manejo centralizado de errores
app.use((error, req, res, next) => {
  console.error('❌ Error capturado:', error);
  res.status(500).json({ mensaje: 'Error interno del servidor.', detalle: error.message });
});

if (require.main === module && process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}.`);
  });
}

module.exports = app;