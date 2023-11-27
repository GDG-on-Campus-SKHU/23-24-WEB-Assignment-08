import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import MenuBar from "./component/menubar";
import Detail from "./component/detail";

const SERVICE_URL = "https://apis.data.go.kr/4510000/GetCulturalPhotoService";
const API_KEY = import.meta.env.VITE_API_KEY;

export type Cultural = {
  firstIndex: number;
  title: string;
  category: string;
  publicType: string;
  regYmd: string;
  ownrNm: string;
  instNm: string;
  instTelno: string;
  imgList: {
    imgUrl: string;
  }[];
};
export type ApiResult = {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body?: {
      items?: {
        item: Cultural[];
      };
    };
  };
};

function App() {
  const [culturalList, setCulturalList] = useState<Cultural[]>([]);

  useEffect(() => {
    getRequestCulturals();
  }, []);

  const getRequestCulturals = async () => {
    const response = await fetch(
      `${SERVICE_URL}/getCulturalInfo?serviceKey=${API_KEY}&pageIndex=30&firstIndex=1&dataType=json`
    );
    const result = (await response.json()) as ApiResult;
    const items = result.response.body?.items?.item || [];

    setCulturalList(items);
  };

  return (
    <div className="App">
      <MenuBar />
      <h1>충청남도 보령시 문화재 구경 </h1>

      <Routes>
        <Route
          path="/"
          element={
            <ul>
              {culturalList.map((cultural) => (
                <li key={cultural.imgList[0]?.imgUrl}>
                  <Link
                    to={`/detail/${encodeURIComponent(
                      cultural.imgList[0]?.imgUrl
                    )}`}
                  >
                    <h3>{cultural.title}</h3>
                    <img
                      className="cultural-image"
                      src={cultural.imgList[0]?.imgUrl}
                      alt={`Cultural ${cultural.title}`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          }
        />
        <Route
          path="/detail/:title"
          element={<Detail culturalList={culturalList} />}
        />
      </Routes>
    </div>
  );
}

export default App;
