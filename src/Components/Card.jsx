import React from "react";

const Card = ({ pokemon, loading, infoPokemon }) => {
    const getTypeClass = (types) => {
        const type = types[0]?.type.name || "unknown";
      
        switch (type) {
          case "fire":
            return "fire-type";
          case "water":
            return "water-type";
          case "grass":
            return "grass-type";
          case "electric":
            return "electric-type";
          case "ice":
            return "ice-type";
          case "fighting":
            return "fighting-type";
          case "poison":
            return "poison-type";
          case "ground":
            return "ground-type";
          case "flying":
            return "flying-type";
          case "psychic":
            return "psychic-type";
          case "bug":
            return "bug-type";
          case "rock":
            return "rock-type";
          case "ghost":
            return "ghost-type";
          case "steel":
            return "steel-type";
          case "normal":
            return "normal-type";
          case "dark":
            return "dark-type";
          case "fairy":
            return "fairy-type";
          default:
            return "unknown-type";
        }
      
      
  };

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        pokemon.map((item) => {
          const typeClass = getTypeClass(item.types);

          return (
            <div className={`card ${typeClass}`} key={item.id} onClick={() => infoPokemon(item)}>
              <h2>{item.id}</h2>
              <img src={item.sprites.front_default} alt="" />
              <h2>{item.name}</h2>
            </div>
          );
        })
      )}
    </>
  );
};

export default Card;
