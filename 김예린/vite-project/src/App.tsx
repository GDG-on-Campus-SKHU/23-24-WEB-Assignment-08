import React, { useState, useEffect } from "react";
type Name = { //한글 이름
    language: {
      name: string;
    };
    name: string;
  }; 
type Flavor = { //특징 설명 가져올 타입 정의
    language: {
      name: string;
    };
    flavor_text: string;
  };
type PokemonData = {
  id: number;
  name: string;
  korean_name: string;
  sprites: {
    front_default: string;
  };
  flavor_text: string;
  weight: string;
  height: string;
};

const App: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<PokemonData[]>([]);
  const [loading, setLoading] = useState(true);
  const [click, setClick] = useState<PokemonData | null>(null);

  useEffect(() => {
    const fetchPokemonData = async (id: number) => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`); //기본적인 정보 주소
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`); //한국어 정보 가져올 주소
        if (!response.ok) {
          throw new Error("Failed to fetch Pokemon data");
        }
        const speciesData = await speciesResponse.json();
        const koreanName = (speciesData.names as Name[]).find((name) => name.language.name === 'ko')?.name;
        const flavorTextEntry = (speciesData.flavor_text_entries as Flavor[]).find((flavor_text) => flavor_text.language.name ==='ko')?.flavor_text;
        const data: PokemonData = await response.json();
        setPokemonList((prevList) => [...prevList, {...data,...speciesData,flavor_text: flavorTextEntry, korean_name: koreanName || ''}]);
      } catch (error) {
        console.error("Error fetching Pokemon data");
      } finally {
        setLoading(false);
      }
    };

    // 100번 까지 가져오기
    for (let id = 1; id <= 100; id++) {
      fetchPokemonData(id);
    }
  }, []);
const handlePoClick = (item: PokemonData)=>{
    setClick(item);
}
const handleGoBack = () => {
    setClick(null); // 뒤로가기 버튼 클릭 시, click 상태를 초기화하여 모달을 닫는다
  };
  const elems = pokemonList.map((pokemon)=>(         
      
        <div className="Movie"  onClick={() => handlePoClick(pokemon)} >           
            <div key={pokemon.id}>
             <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                     
             <h3>{pokemon.korean_name}</h3>
            </div>       
        </div>
  )        
    )
    let popupElem = null;
    if(click != null) {    //클릭하면 팝업창 열림     

        popupElem = (
            <div className="Modal">
                <img src={click.sprites.front_default} />
                <h2> {click.korean_name}</h2>
                <hr />
                <p>번호 : {click.id}</p>                
                <p>영어이름 : {click.name}</p>
                <p>무게 : {click.weight}g</p>
                <p>키 : {click.height}cm</p>
                <p>특징 : {click.flavor_text}</p>                

                <button className="btn" onClick={handleGoBack}>뒤로가기</button>                
            </div>
        )
    }
  return (
    <div className="App">
      <div className="dogambar"  >
       <img src="https://cdn-icons-png.flaticon.com/512/188/188918.png" alt="포켓볼" className="ballimg" /> 
       <h2>포켓몬 도감</h2>
        <input type="text" placeholder="포켓몬 이름 또는 설명, 특성 키워드를 입력해주세요."/>
      <img src="../public/magni.png" alt="serch" className="magni" />
      </div>
         
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <div className="Slider">
                {elems}
        </div>
        
      )}
      {popupElem}
    </div>
  ); 
};

export default App;