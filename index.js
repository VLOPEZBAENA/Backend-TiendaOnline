require('dotenv').config();
const express = require('express');
const cors = require('cors');
const empleadosRouter = require('./routes/empleados');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/empleados', empleadosRouter);

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