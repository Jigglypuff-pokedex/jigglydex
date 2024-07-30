import React, { useState, useEffect } from 'react';
import Navbar from '../Dashboard/navbar.jsx';
import PokemonSelector from './pokemonSelector.jsx';
import './battle.css';

const Battle = () => {
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [userPokemon, setUserPokemon] = useState(null);
    const [computerPokemon, setComputerPokemon] = useState(null);
    const [battleLog, setBattleLog] = useState([]);
    const [isBattleOver, setIsBattleOver] = useState(false);
    const [userTurn, setUserTurn] = useState(true);

    useEffect(() => {
        if (selectedPokemon) {
            const fetchPokemonData = async (pokemonName) => {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
                const data = await response.json();
                return {
                    name: data.name,
                    id: data.id,
                    types: data.types.map(type => type.type.name),
                    image: data.sprites.front_default,
                    stats: {
                        hp: data.stats[0].base_stat,
                        attack: data.stats[1].base_stat,
                        defense: data.stats[2].base_stat,
                        specialAttack: data.stats[3].base_stat,
                        specialDefense: data.stats[4].base_stat,
                        speed: data.stats[5].base_stat,
                    }
                };
            };
            const getRandomPokemonId = () => {
                return Math.floor(Math.random() * 1025) + 1;
            };
    
            const fetchAllPokemon = async () => {
                if (selectedPokemon) {
                    const userData = await fetchPokemonData(selectedPokemon);
                    setUserPokemon(userData);
    
                    const randomPokemonId = getRandomPokemonId();
                    const computerData = await fetchPokemonData(randomPokemonId);
                    setComputerPokemon(computerData);
                }
            };
    
            fetchAllPokemon();
        }
    }, [selectedPokemon]);

    const calculateDamage = (attack, defense) => {
        return Math.max(1, Math.floor((attack - defense) / 10) + Math.floor(Math.random() * 10));
    };

    const handleUserMove = (move) => {
        if (!userPokemon || !computerPokemon || isBattleOver) return;

        let logEntry = `User's ${userPokemon.name} used ${move}! `;
        let newComputerHp = computerPokemon.stats.hp;

        switch (move) {
            case 'Tackle':
                newComputerHp -= calculateDamage(userPokemon.stats.attack, computerPokemon.stats.defense);
                logEntry += `It dealt damage!`;
                break;
            case 'Flamethrower':
                newComputerHp -= calculateDamage(userPokemon.stats.specialAttack, computerPokemon.stats.specialDefense);
                logEntry += `It dealt special damage!`;
                break;
            case 'Defense Curl':
                userPokemon.stats.defense += 10;
                logEntry += `User's ${userPokemon.name} increased its Defense!`;
                break;
            case 'Recover':
                userPokemon.stats.hp = Math.min(userPokemon.stats.hp + 20, 100);
                logEntry += `User's ${userPokemon.name} recovered some HP!`;
                break;
            default:
                break;
        }

        setBattleLog([...battleLog, logEntry]);
        computerPokemon.stats.hp = newComputerHp;
        if (newComputerHp <= 0) {
            setIsBattleOver(true);
            setBattleLog([...battleLog, `Computer's ${computerPokemon.name} fainted! User wins!`]);
        } else {
            setUserTurn(false);
            handleComputerMove();
        }
    };

    const handleComputerMove = () => {
        if (isBattleOver) return;

        const moves = ['Tackle', 'Flamethrower', 'Defense Curl', 'Recover'];
        const move = moves[Math.floor(Math.random() * moves.length)];
        let logEntry = `Computer's ${computerPokemon.name} used ${move}! `;
        let newUserHp = userPokemon.stats.hp;

        switch (move) {
            case 'Tackle':
                newUserHp -= calculateDamage(computerPokemon.stats.attack, userPokemon.stats.defense);
                logEntry += `It dealt damage!`;
                break;
            case 'Flamethrower':
                newUserHp -= calculateDamage(computerPokemon.stats.specialAttack, userPokemon.stats.specialDefense);
                logEntry += `It dealt special damage!`;
                break;
            case 'Defense Curl':
                computerPokemon.stats.defense += 10;
                logEntry += `Computer's ${computerPokemon.name} increased its Defense!`;
                break;
            case 'Recover':
                computerPokemon.stats.hp = Math.min(computerPokemon.stats.hp + 20, 100);
                logEntry += `Computer's ${computerPokemon.name} recovered some HP!`;
                break;
            default:
                break;
        }

        setBattleLog([...battleLog, logEntry]);
        userPokemon.stats.hp = newUserHp;
        if (newUserHp <= 0) {
            setIsBattleOver(true);
            setBattleLog([...battleLog, `User's ${userPokemon.name} fainted! Computer wins!`]);
        } else {
            setUserTurn(true);
        }
    };

    return (
        <>
            <Navbar />
            <div className="battle-arena">
                <h1 className="arena-heading">Battle Arena</h1>
                {selectedPokemon ? (
                    <div className="arena">
                        {userPokemon && (
                            <div className="pokemon-card">
                                <h2>User's Pokémon</h2>
                                <p>Name: {userPokemon.name}</p>
                                <img src={userPokemon.image} alt={userPokemon.name} />
                                <p>HP: {userPokemon.stats.hp}</p>
                                <p>Attack: {userPokemon.stats.attack}</p>
                                <p>Defense: {userPokemon.stats.defense}</p>
                                <p>Special Attack: {userPokemon.stats.specialAttack}</p>
                                <p>Special Defense: {userPokemon.stats.specialDefense}</p>
                                <p>Speed: {userPokemon.stats.speed}</p>
                            </div>
                        )}
                        {computerPokemon && (
                            <div className="pokemon-card">
                                <h2>Computer's Pokémon</h2>
                                <p>Name: {computerPokemon.name}</p>
                                <img src={computerPokemon.image} alt={computerPokemon.name} />
                                <p>HP: {computerPokemon.stats.hp}</p>
                                <p>Attack: {computerPokemon.stats.attack}</p>
                                <p>Defense: {computerPokemon.stats.defense}</p>
                                <p>Special Attack: {computerPokemon.stats.specialAttack}</p>
                                <p>Special Defense: {computerPokemon.stats.specialDefense}</p>
                                <p>Speed: {computerPokemon.stats.speed}</p>
                            </div>
                        )}
                        <div>
                            <h3>Battle Log</h3>
                            <ul>
                                {battleLog.map((log, index) => (
                                    <li key={index}>{log}</li>
                                ))}
                            </ul>
                        </div>
                        {!isBattleOver && userTurn && (
                            <div>
                                <button onClick={() => handleUserMove('Tackle')}>Tackle</button>
                                <button onClick={() => handleUserMove('Flamethrower')}>Flamethrower</button>
                                <button onClick={() => handleUserMove('Defense Curl')}>Defense Curl</button>
                                <button onClick={() => handleUserMove('Recover')}>Recover</button>
                            </div>
                        )}
                        {isBattleOver && <button onClick={startBattle}>Start New Battle</button>}
                    </div>
                ) : (
                    <PokemonSelector onSelect={setSelectedPokemon} />
                )}
            </div>
        </>
    );
};

export default Battle;
