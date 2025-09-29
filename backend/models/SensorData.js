// MongoDB veri şemasını tanımlar
const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  airQuality: { type: Number, required: true },
});

module.exports = mongoose.model('SensorData', sensorDataSchema);