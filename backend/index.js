// Express sunucusunu başlatır ve MongoDB Atlas'a bağlanır
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const simulateData = require('./utils/simulateData');
const sensorRoutes = require('./routes/api');

const app = express();

// Middleware: JSON parsing ve CORS desteği
app.use(express.json());
app.use(cors());

// API rotalarını bağla
app.use('/api', sensorRoutes);

// MongoDB Atlas bağlantısı
mongoose.connect('mongodb+srv://cevikserwan_db_user:F8p63dCpoNECxY17@iot.vycomea.mongodb.net/iot_environment?retryWrites=true&w=majority&appName=IOT', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Atlas bağlandı'))
  .catch(err => console.error('MongoDB bağlantı hatası:', err));

// Sensör verisi simülasyonunu başlat (her 10 saniyede veri üretir)
setInterval(simulateData, 10000);

// Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor`));