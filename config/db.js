const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI no está definida en el archivo .env');
      return;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ Conectado exitosamente a MongoDB Atlas: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ Error al conectar a MongoDB Atlas: ${error.message}`);
  }
};

module.exports = connectDB;