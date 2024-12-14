import React, { useState, useEffect } from 'react';
import Player from './Player';
import Button from './Button';
import HUD from './HUD';
import './game.css';
import socket from '../socket';
import { useParams } from 'react-router-dom';

const Game = (props) => {
    const { roomCode } = useParams();
    const [selectedCard, setSelectedCard] = useState([]);
    const [gameData, setGameData] = useState(null)
    const [mycards, setMycards] = useState(null)


    const handlePlay = () => {
        if (selectedCard) {
        } else {
            alert("Please select a card first!");
        }
    };

    useEffect(() => {

        const updateGame = data => {
            console.log(data)
            setGameData(data)
        }
        socket.on('update', updateGame)

        return () => {
            socket.off('update', updateGame)
        }
    }, [roomCode])


    useEffect(() => {
        socket.emit('joinRoom', roomCode)
        console.log('a')
    }, [roomCode])

    useEffect(() => {
        if (!gameData) return;
        if (!gameData.players[0].cards) return;
        for (let i = 0; i < gameData.players.length; i++) {
            if (socket.id === gameData.players[i].id) {
                setMycards(gameData.players[i].cards)
                console.log('cards', gameData.players[i].cards)
            }
        }

    }, [gameData])


    const handleSelect = (index) => {
        for (let i = 0; i <= selectedCard.length; i++) {
            if (i === index) {
                setSelectedCard(selectedCard.splice(i, 1))
            }
            else {
                setSelectedCard(selectedCard.push(i))
            }
        }
    }

    const handleStart = () => {
        socket.emit('start', roomCode)
    }


    return (
        <div className="game">
            <HUD />
            <div className="container">
                <Player id={0} onCardClick={handleSelect} clickable cards={mycards} />
                <Player id={1} clickable={false} />
                <Player id={2} clickable={false} />
                <Player id={3} clickable={false} />
                <Player id={4} clickable={false} />
            </div>
            {
                gameData && gameData.started ? <Button onClick={handlePlay} value='Хөзөр гаргах' /> :
                    <Button onClick={handleStart} value='start' />
            }
        </div>
    );
};

export default Game;