import { useEffect, useState } from 'react';
import './PokeList.css'
import PokemonCard from './PokemonCard';

function PokeList() {
  const [allPokemons, setAllPokemons] = useState([]);

  const fetchPokemonData = async (pokemon) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
    const data = await res.json();
    return data;
  };

  const getAllPokemons = async () => {
    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=649&offset=0');
      const data = await res.json();

      const pokemonPromises = data.results.map(async (pokemon) => {
        return fetchPokemonData(pokemon);
      });

      const pokemonData = await Promise.all(pokemonPromises);

      setAllPokemons(pokemonData.sort((a, b) => a.id - b.id));
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
    }
  };

  useEffect(() => {
    getAllPokemons();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='app-container'>
      <div className="pokemon-container">
        {allPokemons.map((pokemonStats) => (
          <PokemonCard
            key={pokemonStats.id}
            id={pokemonStats.id.toString().padStart(3, '0')}
            image={pokemonStats.sprites.other["official-artwork"].front_default}
            name={pokemonStats.name.replace(/^./, (str) => str.toUpperCase())}
            type={pokemonStats.types[0].type.name}
            weight={pokemonStats.weight}
            height={pokemonStats.height}
            stats={pokemonStats.stats.map((stat) => stat.base_stat).slice(0, 3)}
            statsName={pokemonStats.stats.map((stat) => stat.stat.name).slice(0, 3)}
          />      
        ))}
      </div>
    </div>
  )
}
export default PokeList