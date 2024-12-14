import { useState } from 'react';
import './home.css'
import play from '../gameAssets/play.png';
import cardM from '../cardAssets/m.png'
import cardU from '../cardAssets/u.png'
import cardU2 from '../cardAssets/u2.png'
import cardSh from '../cardAssets/sh.png'
// import cardSh2 from '../cardAssets/sh2.png'
import cardI from '../cardAssets/i.png'
import cardG from '../cardAssets/g.png'

const Home = () => {

    const [modalOpen, setModalOpen] = useState(false)
    const [playClicked, setPlayClicked] = useState(false)

    const shiftShit = () => {
        if (modalOpen) return setModalOpen(false);
        setPlayClicked(!playClicked)
    }


    if (!playClicked) {
        return (
            <main>
                <div className='wrapper'>
                    <div className='cards'>
                        <div className='cardWrapper'>
                            <img alt='m' src={cardM}></img>
                        </div>
                        <div className='cardWrapper'>
                            <img alt='u' src={cardU}></img>
                        </div>
                        <div className='cardWrapper'>
                            <img alt='u' src={cardU2}></img>
                        </div>
                        <div className='cardWrapper'>
                            <img alt='sh' src={cardSh}></img>
                        </div>
                        <div className='cardWrapper'>
                            <img alt='i' src={cardI}></img>
                        </div>
                        <div className='cardWrapper'>
                            <img alt='g' src={cardG}></img>
                        </div>
                    </div>
                    <button className='playBtn' onClick={shiftShit}>
                        <img alt='play' src={play}></img>
                    </button>
                </div>
            </main>
        )
    }
    return (
        <main>
            <button className='backBtn' onClick={shiftShit}>
                <img alt='play' src={play}></img>
            </button>
            <div className={`backdrop ${playClicked ? 'opaa' : ''}`}>
                <div className='menuBtn'>
                    <button id="createBtn">Create Room</button>
                    <button id="joinBtn" onClick={() => setModalOpen(true)}>Joinasdfasdf Room</button>
                </div>
                {
                    modalOpen &&
                    <div id="joinModal" className="modal">
                        {/* <div className="title">
                            <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
                        </div> */}
                        <div className="modal-content" id="activeRooms">
                            <form id="enterGame">
                                <input id="code" type="text" className='coolInput' pattern="[A-Za-z]*" minLength="4" maxLength="4" placeholder="Code"
                                    required />
                                <button><input type="submit" hidden={true} />Play</button>
                            </form>
                        </div>
                    </div>
                }
            </div>
        </main>
    )
}

export default Home;