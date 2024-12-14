import React, { useState, useEffect, useRef } from "react";
import "./muushig.css";
import socket from '../socket.js';
import { useNavigate } from "react-router-dom";

const Button = ({ id, label, onClick, hidden }) => (
    <button className={`button`} id={id} onClick={onClick}>
        <h1>{label}</h1>
    </button>
);

const FormContainer = ({ title, children, hidden }) => (
    <div className={`form-container ${hidden ? "hidden" : ""}`}>
        <h2>{title}</h2>
        {children}
    </div>
);

const Settings = ({ onApply, audioVolume, setAudioVolume, audio }) => (
    <FormContainer title="Settings" hidden={false}>
        <div className="settings-group">
            <label htmlFor="volumeControl">Audio Volume:</label>
            <input
                type="range"
                id="volumeControl"
                min="0"
                max="100"
                value={audioVolume}
                onChange={(e) => {
                    const volume = e.target.value;
                    setAudioVolume(volume);
                    if (audio) {
                        audio.volume = volume / 100;
                        console.log(audio.volume)
                    }
                }}
            />
            <span id="volumeValue">{audioVolume}</span>%
        </div>
        <button className="button" onClick={onApply}>
            <h1>Apply</h1>
        </button>
    </FormContainer>
);

const App = ({ setRoomCode }) => {
    const [currentView, setCurrentView] = useState("menu");
    const [formTitle, setFormTitle] = useState("");
    const [formContent, setFormContent] = useState(null);
    const [audioVolume, setAudioVolume] = useState(50);
    const [audio] = useState(new Audio("/assets/music.mp3"));
    const roomCodeRef = useRef()
    const navigate = useNavigate();


    useEffect(() => {
        audio.loop = true;
        audio.autoplay = true;
        audio.volume = audioVolume / 100;
        // audio.play();

        // return () => {
        //     audio.pause();
        //     audio.currentTime = 0;
        //     console.log('audio stopped')
        // };
    }, [audio, audioVolume]);

    useEffect(() => {
        const navToGame = roomCode => {
            console.log('room created', roomCode)
            setRoomCode(roomCode)
            navigate(`/game/${roomCode}`)
        }
        socket.on('createRoom', navToGame)

        return () => {
            socket.off('createRoom', navToGame)
        }
    }, [setRoomCode, navigate])


    const updateView = (view, title = "", content = null) => {
        audio.paused && audio.play();
        setCurrentView(view);
        setFormTitle(title);
        setFormContent(content);

        if (view === "playOptions") {
            audio.play().catch((error) => {
                console.error("Audio play failed:", error);
            });
        }
    };

    const applySettings = () => {
        alert(`Settings applied:\nVolume: ${audioVolume}%`);
        setCurrentView("menu");
    };

    const trackInput = e => {
        const value = e.target.value;
        const regex = /^[A-Za-z]{0,4}$/;
        if (regex.test(value)) {
            roomCodeRef.current.value = value;
        }
    }

    const joinRoom = () => {
        if (roomCodeRef.current.value.length < 4) {
            alert("invalid code")
        }
        console.log(roomCodeRef.current.value)
    }

    const createRoom = () => {
        socket.emit('createRoom')
    }

    return (
        <div className="container">
            {currentView === "menu" && (
                <div className="buttons">
                    <Button id="playButton" label="Play" onClick={() => updateView("playOptions")} hidden={false} />
                    <Button id="profileButton" label="Profile" onClick={() => alert("Profile Clicked")} hidden={false} />
                    <Button id="settingsButton" label="Settings" onClick={() => updateView("settings")} hidden={false} />
                    <Button id="statsButton" label="Stats" onClick={() => alert("Stats Clicked")} hidden={false} />
                </div>
            )}

            {currentView === "playOptions" && (
                <div className="buttons">
                    <Button
                        id="joinButton"
                        label="Join"
                        onClick={() =>
                            updateView(
                                "form",
                                "Join a Room",
                                <>
                                    <input type="text" className="input-field" placeholder="Enter Room Code"
                                        ref={roomCodeRef}
                                        onInput={trackInput}
                                        minLength={4}
                                        maxLength={4}
                                    />
                                    <Button
                                        id="joinRoomSubmit"
                                        label="Join"
                                        onClick={joinRoom}
                                    />
                                </>
                            )
                        }
                        hidden={false}
                    />
                    <Button id="createRoomButton"
                        label="Create Room" onClick={createRoom}
                    />
                </div>
            )}

            {currentView === "form" && (
                <FormContainer title={formTitle} hidden={false}>
                    {formContent}
                    {/* <Button id="backButton" label="← Back" onClick={handleBack} hidden={false} /> */}
                </FormContainer>
            )}

            {currentView === "settings" && (
                <Settings
                    onApply={applySettings}
                    audioVolume={audioVolume}
                    setAudioVolume={setAudioVolume}
                    audio={audio}
                />
            )}
            {(currentView === 'playOptions' || currentView === "settings" || currentView === 'form') &&

                <Button id="backButton" label="← Back" onClick={() => updateView("menu")} hidden={false} />
            }

            <div className="background">
                <img src="assets/background.png" alt="" />
            </div>
        </div>
    );
};

export default App;
