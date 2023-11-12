import React, { useState, useEffect } from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";
import { Routes, Route, Link } from "react-router-dom";
import AboutMe from "./AboutMe";
const Main = () => {
    const [pokeData, setPokeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [pokeDex, setPokeDex] = useState();

    const pokeFun = async () => {
        setLoading(true);
        try {
            const res = await fetch(url);
            const data = await res.json();
            setNextUrl(data.next);
            setPrevUrl(data.previous);
            await getPokemon(data.results);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    const getPokemon = async (pokemonList) => {
        const pokemonData = await Promise.all(
            pokemonList.map(async (item) => {
                try {
                    const res = await fetch(item.url);
                    const data = await res.json();
                    return data;
                } catch (error) {
                    console.error("Error fetching Pokémon data:", error);
                    return null;
                }
            })
        );
        setPokeData((state) => {
            state = [...pokemonData.filter((item) => item !== null)];
            state.sort((a, b) => (a.id > b.id ? 1 : -1));
            return state;
        });
    };

    useEffect(() => {
        pokeFun();
    }, [url]);

    return (
      <>
          <div className="container">
              <div className="left-content">
                  <Card pokemon={pokeData} loading={loading} infoPokemon={(poke) => setPokeDex(poke)} />

                  <div className="btn-group">
                      {prevUrl && (
                          <button
                              onClick={() => {
                                  setPokeData([]);
                                  setUrl(prevUrl);
                              }}
                          >
                              Previous
                          </button>
                      )}

                      {nextUrl && (
                          <button
                              onClick={() => {
                                  setPokeData([]);
                                  setUrl(nextUrl);
                              }}
                          >
                              Next
                          </button>
                      )}
                  </div>
              </div>
              <div className="right-content">
                  <Pokeinfo data={pokeDex} />
                  <Link to="/about">About</Link>
              </div>
          </div>
          <Routes>
              <Route path="/about" element={<AboutMe />} />
          </Routes>
      </>
  );
};

export default Main