// Filter component
// Tarih bazlı veri filtreleme bileşeni
import React, { useState } from 'react';
import axios from 'axios';

function Filter() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/data/filter?startDate=${startDate}&endDate=${endDate}`);
      setFilteredData(res.data);
    } catch (err) {
      console.error('Filtreleme hatası:', err);
    }
  };

  return (
    <div className="mb-4">
      <input
        type="date"
        value={startDate}
        onChange={e => setStartDate(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="date"
        value={endDate}
        onChange={e => setEndDate(e.target.value)}
        className="border p-2 mr-2"
      />
      <button onClick={handleFilter} className="bg-blue-500 text-white p-2 rounded">
        Filtrele
      </button>
      {filteredData.length > 0 && (
        <ul className="mt-2">
          {filteredData.map(d => (
            <li key={d._id}>
              {new Date(d.timestamp).toLocaleString()}: Sıcaklık: {d.temperature}°C, Nem: {d.humidity}%, Hava Kalitesi: {d.airQuality}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Filter;