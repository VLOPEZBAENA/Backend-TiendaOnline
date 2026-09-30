require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const empleadosRouter = require('./routes/empleados');

const app = express();

app.use(cors());
app.use(express.json());

// Iniciar conexión a la base de datos
connectDB();

app.use('/api/empleados', empleadosRouter);

app.use((error, req, res, next) => {
  console.error('❌ Error capturado:', error);
  res.status(500).json({ mensaje: 'Error interno del servidor.', detalle: error.message });
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}.`);
  });
}

module.exports = app;