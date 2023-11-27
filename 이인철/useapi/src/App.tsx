import {useState } from 'react';
import './App.css';
const App = () => {
  const [data, setData] = useState<any>([]);
  const [selectaddr, setselectaddr] = useState<any>(null);
  const [inputvalue, setinputValue] = useState<any>('');
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const pageNo = 1;  // 페이지 번호
  const numOfRows = 7;  // 한 페이지 결과 수

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://apis.data.go.kr/6260000/FoodService/getFoodKr?serviceKey=${API_KEY}&pageNo=${pageNo}&numOfRows=${numOfRows}`, { mode: 'cors' });
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/xml');
        const elements = doc.querySelectorAll('body items item');
        const data = Array.from(elements).map(element => {
          const title = element.querySelector('MAIN_TITLE')?.textContent || '';
          const addr = element.querySelector('ADDR1')?.textContent || '';
          return { title, addr };
        });
        console.log(doc);
        setData(data);
        console.log(response);
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
      }
      setIsLoading(false);
    };
    const addlist =()=>{
      setData([...data, {title:inputvalue, addr:''}])
      setinputValue('');
    }


    return (
      <div>
        <p className='title1'>나만의 부산맛집리스트</p>
       
        <br/>
        맛집리스트 추가하기<br/>
        <input type="text" value={inputvalue} onChange={e => setinputValue(e.target.value)}/>
        <input type="button" value="추가하기" onClick={addlist}/>
        <hr/>
        {isLoading ? (
          <div>loading</div>
        ) : (
          <div>
            {Array.isArray(data) && data.map((item:any, index:any) => (
              <p key={index} onClick={() => setselectaddr(item.addr)}>{item.title}
              <input type="button" value='x' onClick={() => setData(data.filter((i:any) => i.title !== item.title))}/></p>
            ))}
          </div>
        )}
        <input type="button" value="추천맛집 찾아보기" onClick={fetchData}/>
        <input type="button" value="전체 삭제하기" onClick={() => setData([])}/>
        <hr/>
        <br/>
        <h1>추천맛집주소</h1>
        {selectaddr && <div>{selectaddr}</div>}
      </div>
    );
  };
  
  export default App;
  