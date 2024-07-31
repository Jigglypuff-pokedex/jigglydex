import React, { useState } from 'react';

const PokemonSelector = ({ onSelect }) => {
    const [selectedPokemon, setSelectedPokemon] = useState('');

    const pokemonNames = [
        'jigglypuff', 'pikachu', 'charmander', 'bulbasaur', 'squirtle'];

    const handleSelect = () => {
        if (selectedPokemon) {
            onSelect(selectedPokemon);
        }
    };

    return (
        <div className="pokemon-selector">
            {/* <h2 className="select-heading">Select Your Pokemon</h2> */}
            <div className="pokemon-select-box">
                <select className="battle-dropdown" value={selectedPokemon} onChange={(e) => setSelectedPokemon(e.target.value)}>
                    <option value="">Select a Pokemon</option>
                    {pokemonNames.map((name) => (<option key={name} value={name}>{name}</option>))}
                </select>
                <button className="select-pokemon-button" onClick={handleSelect}>Select</button>
            </div>
        </div>
    );
};

export default PokemonSelector;
