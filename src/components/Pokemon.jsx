import React, { useEffect, useState } from 'react';
import PokemonCards from './PokemonCards';
const Pokemon = () => {
    const API = "https://pokeapi.co/api/v2/pokemon?limit=124";
    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const fetchPokemon = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json();
            // console.log(data); // for debugging
            const DetailedPokemonData = data.results.map(async (currpokemon) => {
                const res = await fetch(currpokemon.url)
                const data = await res.json()
                return (data)
            }
            );
            // console.log(DetailedPokemonData)
            const ResponseAll = await Promise.all(DetailedPokemonData);
            //console.log(ResponseAll)
            setPokemonData(ResponseAll);
            setLoading(false);
            // setPokemonList(data.results); // store the list in state
        } catch (error) {
            console.log("Error fetching Pokémon:", error);
            setLoading(false);
            setError(error);
        }
    };

    useEffect(() => {
        fetchPokemon();
    }, []);

    const searchData = pokemonData.filter((currpokemon) =>
        currpokemon.
            name.toLowerCase().
            includes(search.toLowerCase()));
    if (loading) {
        return (
            <div>
                <h1>Loading....</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h1>{error.message}</h1>
            </div>
        );
    }

    return (
        <div>
            <h1>Hello Pokémon once again</h1>
            <header>
                <div className='pokemon-search'>
                    <input type='text' placeholder='Search Pokemon' value={search}
                        onChange={(e) => setSearch(e.target.value)}>

                    </input>

                </div>
                <div>
                    <ul className='cards'>
                        {
                            searchData.length > 0 ? (
                                searchData.map((currpokemon) => (
                                    <PokemonCards key={currpokemon.id} pokemonData={currpokemon} />
                                ))
                            ) : (
                                <div className="no-result" >No results found!</div>
                            )
                        }

                    </ul>
                </div>
            </header>

        </div>
    );
};

export default Pokemon;
