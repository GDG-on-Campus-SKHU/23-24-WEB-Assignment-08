import { useState, useEffect } from "react";
import axios from "axios";
import "./App.less";
import InputCityName from "./component/InputCityName";
import { CiCloudSun, CiSun } from "react-icons/ci";
import { FaUmbrella, FaRegSnowflake } from "react-icons/fa";
import { IoThunderstormOutline } from "react-icons/io5";
const App = () => {
  type Weather = {
    coord: {
      lon: number;
      lat: number;
    };
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      }
    ];
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    wind: {
      speed: number;
    };
    clouds: {
      all: number;
    };
    name: string;
  };

  const [weather, setWeather] = useState<Weather | null>(null);
  const [city, setCity] = useState<string>("");
  const getBackgroundImageClass = (
    weatherStatus: string | undefined
  ): string => {
    switch (weatherStatus) {
      case "Clear":
        return "weather_clear";
      case "Clouds":
        return "weather_cloud";
      case "Rain":
        return "weather_rain";
      case "Snow":
        return "weather_snow";
      case "Thunderstorm":
        return "weather_thunder";
      default:
        return "weather_default";
    }
  };

  const getWeatherIcon = (
    weatherIconStatus: string | undefined
  ): React.ReactNode => {
    switch (weatherIconStatus) {
      case "Clear":
        return <CiSun />;
      case "Clouds":
        return <CiCloudSun />;
      case "Rain":
        return <FaUmbrella />;
      case "Snow":
        return <FaRegSnowflake />;
      case "Thunderstorm":
        return <IoThunderstormOutline />;
      default:
        return <CiSun />;
    }
  };

  const WeatherIcon = getWeatherIcon(weather?.weather[0]?.main);

  const backgroundImageClass = getBackgroundImageClass(
    weather?.weather[0]?.main
  );
  const SERVICE_KEY = import.meta.env.VITE_SERVICE_KEY;

  const getUserPlace = () => {
    // API에서 현재 위치를 가져오는 로딩시간동안 localStorage에 저장된 도시의 날씨정보 먼저 가져오도록 설정
    const storedCity = window.localStorage.getItem("city");
    if (storedCity) {
      const CITY_URL = `https://api.openweathermap.org/data/2.5/weather?q=${storedCity}&appid=${SERVICE_KEY}`;

      axios
        .get(CITY_URL)
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          console.error("날씨 데이터를 가져오는 중 오류 발생:", error);
        });
    }
    // 현재 위치를 가져오는 함수
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log("현재위치", lat, lon);
        const PLACE_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${SERVICE_KEY}`;
        axios
          .get(PLACE_URL)
          .then((response) => {
            setWeather(response.data);
          })
          .catch((error) => {
            console.error("날씨 데이터를 가져오는 중 오류 발생:", error);
          });
      },
      (error) => {
        console.error("현재 위치를 가져오는 중 오류 발생:", error);
      }
    );
  };
  useEffect(() => {
    // useEffect를 사용해 처음 화면이 렌더링 될 때는 현 위치를 가져오는 대기시간동안 localStorage에 저장된 도시의 날씨정보 먼저 가져오도록 설정
    getUserPlace();
  }, []);

  const onChangeCityName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const getWeatherData = () => {
    // 검색 버튼을 눌렀을 때, 입력한 지역의 날씨를 가져오도록 설정
    if (city.trim() === "") {
      alert("지역을 입력해주세요");
      return;
    }
    const SERVICE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${SERVICE_KEY}`;
    axios
      .get(SERVICE_URL)
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
    window.localStorage.setItem("city", city);
  };

  const weatherDescription = weather?.weather[0]?.description;

  const today = new Date().toDateString(); // 오늘 날짜

  // 최고 온도 (섭씨)
  const maxTemp = weather?.main?.temp_max
    ? (weather.main.temp_max - 273.15).toFixed(0)
    : null;

  // 최저 온도 (섭씨)
  const minTemp = weather?.main?.temp_min
    ? (weather.main.temp_min - 273.15).toFixed(0)
    : null;
  // 온도 (섭씨)
  const Temp = weather?.main?.temp
    ? (weather.main.temp - 273.15).toFixed(0)
    : null;

  return (
    <div className={`Container ${backgroundImageClass}`}>
      <div className="navBar">
        <InputCityName
          onChangeCityName={onChangeCityName}
          getWeatherData={getWeatherData}
          city={city}
        />
        <div className="nav_weatherInfo">
          <p>Weather Details </p>
          <div>
            Weather <span>{weatherDescription}</span>
          </div>
          <div>
            Max / Min Temp
            <span>
              {maxTemp} / {minTemp}°C
            </span>
          </div>
          <div>
            Humidity <span>{weather?.main?.humidity}%</span>
          </div>
          <div>
            Wind <span>{weather?.wind?.speed}m/s</span>
          </div>
        </div>
      </div>
      <p className="Date">{today}</p>
      <div className="weatherInfo">
        <div>{Temp}°C</div>
        <div>{weather?.name}</div>
        <div className={`icon ${WeatherIcon}`}>{WeatherIcon}</div>
      </div>
    </div>
  );
};

export default App;
