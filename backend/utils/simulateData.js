// Sensör verilerini simüle eder ve API'ye gönderir
const axios = require('axios');

const simulateData = async () => {
  // Rastgele veri üret
  const data = {
    temperature: Math.floor(Math.random() * (35 - 20 + 1)) + 20, // 20-35°C
    humidity: Math.floor(Math.random() * (80 - 30 + 1)) + 30, // 30-80%
    airQuality: Math.floor(Math.random() * (100 - 0 + 1)), // 0-100
  };

  try {
    // Veriyi API'ye gönder
    await axios.post('http://localhost:4000/api/data', data);
    console.log('Simüle veri gönderildi:', data);
  } catch (err) {
    console.error('Simülasyon hatası:', err.message);
  }
};

module.exports = simulateData;
