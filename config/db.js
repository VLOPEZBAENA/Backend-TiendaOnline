const mongoose = require('mongoose');

mongoose.set('bufferCommands', false);

const cache = global.mongooseCache || (global.mongooseCache = {
  connection: null,
  promise: null,
});

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('La variable de entorno MONGODB_URI no está definida.');
  }

  if (mongoose.connection.readyState === 1) {
    cache.connection = mongoose.connection;
    return cache.connection;
  }

  if (mongoose.connection.readyState === 0 && cache.connection) {
    cache.connection = null;
    cache.promise = null;
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      bufferCommands: false,
    })
      .then((connection) => {
        cache.connection = connection.connection;
        return cache.connection;
      })
      .catch((error) => {
        cache.connection = null;
        cache.promise = null;
        throw error;
      });
  }

  return cache.promise;
}

module.exports = connectDB;