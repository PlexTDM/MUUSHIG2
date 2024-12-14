
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import { useEffect, useState } from 'react';
import socket from './socket.js';
import HomePage from './components/HomePage.jsx';
import Game from './components/Game.jsx';


const App = () => {

  const [isConnected, setIsConnected] = useState(null);
  const [error, setError] = useState(null);
  const [roomCode, setRoomCode] = useState(null)

  useEffect(() => {
    socket.connect();
  })

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
      console.log('connected')
      setIsConnected(true);
      setError(null);
    }

    const onDisconnect = () => {
      setIsConnected(false);
      console.log('disconnected')
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route exact path='/home' element={<HomePage setRoomCode={setRoomCode} />} />
      <Route exact path='/game/:roomCode' element={<Game roomCode={roomCode} />} />
      {/* <Route path="/about" element={<About />} /> */}
    </Routes>
  );
}

export default App;
