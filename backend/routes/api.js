// API uç noktalarını tanımlar
const express = require('express');
const router = express.Router();
const SensorData = require('../models/SensorData');

// Yeni sensör verisi ekleme
router.post('/data', async (req, res) => {
  try {
    const { temperature, humidity, airQuality } = req.body;
    // Eşik kontrolü: Sıcaklık > 30°C ise uyarı
    const alert = temperature > 30 ? 'Sıcaklık çok yüksek!' : null;
    const newData = new SensorData({ temperature, humidity, airQuality });
    await newData.save();
    res.status(201).json({ data: newData, alert });
  } catch (err) {
    res.status(500).json({ error: 'Veri kaydedilemedi' });
  }
});

// Tüm verileri alma
router.get('/data', async (req, res) => {
  try {
    const data = await SensorData.find().sort({ timestamp: -1 }).limit(50);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Veri alınamadı' });
  }
});

// Tarih bazlı veri filtreleme
router.get('/data/filter', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const data = await SensorData.find({
      timestamp: { $gte: new Date(startDate), $lte: new Date(endDate) },
    }).sort({ timestamp: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Filtreleme hatası' });
  }
});

module.exports = router;