import { FaSearch } from "react-icons/fa";

const InputCityName = ({
  onChangeCityName,
  getWeatherData,
  city,
}: {
  onChangeCityName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getWeatherData: () => void;
  city: string;
}) => {
  return (
    <div className="InputBar">
      <input
        type="text"
        placeholder="지역을 영문으로 입력해주세요 (ex. Seoul)"
        value={city}
        onChange={onChangeCityName}
      ></input>
      <button type="submit" onClick={getWeatherData}>
        <FaSearch />
      </button>
    </div>
  );
};

export default InputCityName;
