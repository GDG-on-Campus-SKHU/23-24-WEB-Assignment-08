import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiComponent = () => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://apis.data.go.kr/6280000/ICTaxiStat/TaxiIntensiveAreaInfo?serviceKey=1%2BBp0W4NcROGYiDYhfO%2FME5j1bUMdCZtsMvxHJeIrJ9KJRpPq9lkVZrKNPIOvLzEEqUGqBXrHRkIe27SsvpaaQ%3D%3D&pageNo=1&numOfRows=10&YMD=20220701'
        );
        setApiData(response.data);
      } catch (error) {
        console.error('Error fetching API data:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div>
      <div className="header">
        <img src="public/title_logo.png" alt="Title Logo" />
      </div>
      <div>
        <h1>인천광역시 택시 통계 서비스</h1>
        {apiData && (
          <div>
            <ul className="api-list">
              {apiData.response.body.items.map((item, index) => (
                <li key={index} className="api-item">
                  <p>날짜: {item.ymd}</p>
                  <p>시간: {item.hour}</p>
                  <p>동네이름: {item.dongName}</p>
                  <p>랭킹: {item.rank}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiComponent;
