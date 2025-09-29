// Dashboard component
// Dashboard: Canlı grafikler ve bildirimler
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard() {
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState(null);

  // Verileri backend'den çek
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/data');
        setData(res.data);
        // En son veriyi kontrol et
        const latest = res.data[0];
        if (latest && latest.alert) setAlert(latest.alert);
      } catch (err) {
        console.error('Veri alınamadı:', err);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 10000); // Her 10 saniyede yenile
    return () => clearInterval(interval);
  }, []);

  // Grafik verileri
  const chartData = {
    labels: data.map(d => new Date(d.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Sıcaklık (°C)',
        data: data.map(d => d.temperature),
        borderColor: 'rgb(255, 99, 132)',
        fill: false,
      },
      {
        label: 'Nem (%)',
        data: data.map(d => d.humidity),
        borderColor: 'rgb(54, 162, 235)',
        fill: false,
      },
      {
        label: 'Hava Kalitesi',
        data: data.map(d => d.airQuality),
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
      },
    ],
  };

  return (
    <div>
      {alert && <div className="bg-red-500 text-white p-2 mb-4 rounded">{alert}</div>}
      <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
    </div>
  );
}

export default Dashboard;