import React, { useEffect, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import styled, { keyframes } from 'styled-components';
import pokeball from '../../assets/pkball.png';
import pokemonCard from '../../assets/hihi.png'; 
import crystalball from '../../assets/crystalball.jpg'; 

const MachineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 600px;
  position: relative;
  perspective: 1000px;
`;

const BallContainer = styled.div`
  width: 400px;
  height: 400px;
  background: url(${crystalball}) no-repeat center center;
  background-size: contain;
  position: relative;
  transform-style: preserve-3d;
  display: flex;
  align-items: flex-end; 
  justify-content: center;
`;

const Ball = styled.div`
  width: 50px;
  height: 50px;
  background: url(${pokeball}) no-repeat center center;
  background-size: contain;
  position: absolute;
  border-radius: 50%;
  bottom: 10px; 
  &.selected-ball {
    animation: glow 1s infinite alternate;
  }
  @keyframes glow {
    from {
      box-shadow: 0 0 10px rgba(255, 255, 0, 0.8), 0 0 20px rgba(255, 255, 0, 0.6),
        0 0 30px rgba(255, 255, 0, 0.4);
    }
    to {
      box-shadow: 0 0 20px rgba(255, 255, 0, 1), 0 0 30px rgba(255, 255, 0, 0.8),
        0 0 40px rgba(255, 255, 0, 0.6);
    }
  }
`;

const Exit = styled.div`
  width: 60px;
  height: 60px;
  border: 2px solid #000;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
`;

const Card = styled.div`
  width: 200px;
  height: 300px;
  background: url(${pokemonCard}) no-repeat center center;
  background-size: contain;
  display: ${({ show }) => (show ? 'block' : 'none')};
  margin-top: 20px;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ffcc5c;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #ff6b6b;
  }
`;

const getRandomPosition = (maxWidth) => ({
  left: Math.random() * (maxWidth - 60) + 'px',
  bottom: '10px', // 初始位置在底部
});

const PokemonGachaMachine = () => {
  const [balls, setBalls] = useState([]);
  const [selectedBall, setSelectedBall] = useState(null);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const initialBalls = [];
    for (let i = 0; i < 20; i++) {
      initialBalls.push(getRandomPosition(400));
    }
    setBalls(initialBalls);
  }, []);

  const startAnimation = () => {
    anime({
      targets: '.ball',
      translateX: () => anime.random(-150, 150),
      translateY: () => anime.random(-50, 150), 
      rotate: () => anime.random(-360, 360),
      duration: 2000,
      easing: 'easeInOutQuad',
      direction: 'alternate',
      loop: true,
    });

    setTimeout(() => {
      anime.remove('.ball');
      const randomIndex = Math.floor(Math.random() * balls.length);
      setSelectedBall(balls[randomIndex]);

      anime({
        targets: '.ball',
        translateY: 0,
        duration: 1000,
        easing: 'easeInOutQuad',
        complete: () => {
          moveToExit();
        },
      });
    }, 3000);
  };

  const moveToExit = () => {
    anime({
      targets: '.selected-ball',
      translateY: 150, // 滚到出口的位置
      translateX: 0, // 滚到出口的位置
      duration: 1000,
      easing: 'easeInOutQuad',
      complete: () => setShowCard(true),
    });
  };

  return (
    <MachineContainer>
      <BallContainer>
        {balls.map((pos, index) => (
          <Ball key={index} className={`ball ${selectedBall === pos ? 'selected-ball' : ''}`} style={pos} />
        ))}
        <Exit />
      </BallContainer>
      <Button onClick={startAnimation}>PokéDraw!</Button>
      <Card show={showCard} />
    </MachineContainer>
  );
};

export default PokemonGachaMachine;
