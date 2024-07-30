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

    const renderStatBar = (label, value, className) => (
        <div className="stat-bar">
            <div className={`stat-bar-fill ${className}`} style={{ width: `${value}%` }}></div>
        </div>
    );

    const startBattle = () => {
        setSelectedPokemon(null);
        setUserPokemon(null);
        setComputerPokemon(null);
        setBattleLog([]);
        setIsBattleOver(false);
        setUserTurn(true);
    };

    return (
        <>
            <Navbar />
            <div className="battle-arena">
                <h1 className="arena-heading">Battle Arena</h1>
                {selectedPokemon ? (
                    <div className="arena">
                        <div className="opponents">
                            {userPokemon && (
                                <div className="pokemon-card">
                                    <div className="name-image">
                                        <h2>Your Pokémon</h2>
                                        <h3>{userPokemon.name}</h3>
                                        <img className="battle-image" src={userPokemon.image} alt={userPokemon.name} />
                                    </div>
                                    <div className="battle-stats">
                                        <div className="stat-row">
                                            <span className="stat-name">HP:</span>
                                            {renderStatBar('HP', userPokemon.stats.hp, 'hp-bar-fill')}
                                        </div>
                                        <div className="stat-row">
                                            <span className="stat-name">Attack:</span>
                                            {renderStatBar('Attack', userPokemon.stats.attack, 'attack-bar-fill')}
                                        </div>
                                        <div className="stat-row">
                                            <span className="stat-name">Defense:</span>
                                            {renderStatBar('Defense', userPokemon.stats.defense, 'defense-bar-fill')}
                                        </div>
                                        <div className="stat-row">
                                            <span className="stat-name">Special Attack:</span>
                                            {renderStatBar('Special Attack', userPokemon.stats.specialAttack, 'special-attack-bar-fill')}
                                        </div>
                                        <div className="stat-row">
                                            <span className="stat-name">Special Defense:</span>
                                            {renderStatBar('Special Defense', userPokemon.stats.specialDefense, 'special-defense-bar-fill')}
                                        </div>
                                        <div className="stat-row">
                                            <span className="stat-name">Speed:</span>
                                            {renderStatBar('Speed', userPokemon.stats.speed, 'speed-bar-fill')}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {computerPokemon && (
                                <div className="pokemon-card">
                                    <div className="name-image">
                                        <h2>Computer's Pokémon</h2>
                                        <h3>{computerPokemon.name}</h3>
                                        <img className="battle-image" src={computerPokemon.image} alt={computerPokemon.name} />
                                    </div>
                                    <div className="battle-stats">
                                        <div className="stat-row">
                                            <span className="stat-name">HP:</span>
                                            {renderStatBar('HP', computerPokemon.stats.hp, 'hp-bar-fill')}
                                        </div>
                                        <div className="stat-row">
                                            <span className="stat-name">Attack:</span>
                                            {renderStatBar('Attack', computerPokemon.stats.attack, 'attack-bar-fill')}
                                        </div>
                                        <div className="stat-row">
                                            <span className="stat-name">Defense:</span>
                                            {renderStatBar('Defense', computerPokemon.stats.defense, 'defense-bar-fill')}
                                        </div>
                                        <div className="stat-row">
                                            <span className="stat-name">Special Attack:</span>
                                            {renderStatBar('Special Attack', computerPokemon.stats.specialAttack, 'special-attack-bar-fill')}
                                        </div>
                                        <div className="stat-row">
                                            <span className="stat-name">Special Defense:</span>
                                            {renderStatBar('Special Defense', computerPokemon.stats.specialDefense, 'special-defense-bar-fill')}
                                        </div>
                                        <div className="stat-row">
                                            <span className="stat-name">Speed:</span>
                                            {renderStatBar('Speed', computerPokemon.stats.speed, 'speed-bar-fill')}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <section className="battle-actions">
                            <div className="user-actions">
                                {!isBattleOver && userTurn && (
                                    <div>
                                        <button className="action-button" onClick={() => handleUserMove('Tackle')}>Tackle</button>
                                        <button className="action-button" onClick={() => handleUserMove('Flamethrower')}>Flamethrower</button>
                                        <button className="action-button" onClick={() => handleUserMove('Defense Curl')}>Defense Curl</button>
                                        <button className="action-button" onClick={() => handleUserMove('Recover')}>Recover</button>
                                    </div>
                                )}
                                {isBattleOver && <button className="new-battle" onClick={startBattle}>Start New Battle</button>}
                                {/* <button className="new-battle" onClick={startBattle}>Start New Battle</button> */}
                            </div>
                            <div className="battle-log">
                                <div className="battle-log-heading">
                                    <h2>Battle Log</h2>
                                </div>
                                <ul>
                                    {battleLog.map((log, index) => (
                                        <li key={index}>{log}</li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    </div>
                ) : (
                    <PokemonSelector onSelect={setSelectedPokemon} />
                )}
            </div>
        </>
    );
};

export default Battle;