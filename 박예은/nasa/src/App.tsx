// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface ApodData {
  date: string;
  title: string;
  explanation: string;
  url: string;
}

const App = () => {
  const [apodData, setApodData] = useState<ApodData | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    const fetchApodData = async () => {
      try {
        const apiKey = '55o2F6xLsBJA2kOin5OHCf8NnZMGLBsAnPpmX263';
        const apiUrl = selectedDate
          ? `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${selectedDate}`
          : `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
        const response = await axios.get(apiUrl);
        const data: ApodData = response.data;

        setApodData(data);
      } 

      catch (error) {
        console.error('Error fetching APOD data:', error);
      }

    };

    fetchApodData();
  }, 
  [selectedDate]
  );


  return (
    <div className="App">

      {apodData && (
        <div className='containerbox'>

          <div className="image">
            <img src={apodData.url} alt="APOD" />
          </div>

          <div className='container'>
            <div className="details">
              <h1>Today's Outer space 🚀</h1>
              <hr />
              <h2>{apodData.title}</h2>
              <p>Select Date:<div><input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                /></div>
              <br />
              </p>
              <p className='bla'>{apodData.explanation}</p>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default App;
