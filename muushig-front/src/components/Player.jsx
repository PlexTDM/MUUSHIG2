import { useState } from 'react';

const Player = ({ id, onCardClick, clickable, cards }) => {
    const cardUrl = '../cardAssets/'

    const hiddenCard = '/cardAssets/cardBACK.png';

    if (clickable) {
        return (
            <div className='player' id={`player${id + 1}`}>
                {cards && cards.map((card, i) => (
                    <Card key={i} onClick={onCardClick} id={id} src={`${cardUrl}${card.suit}/${card.suit}${card.rank}.png`} />
                ))}
            </div>
        );
    } else {
        return (
            <div className={`player`} id={`player${id + 1}`}>
                <img
                    key={1}
                    src={hiddenCard}
                    alt={`Card hidden`}
                    className="card"
                /><img
                    key={2}
                    src={hiddenCard}
                    alt={`Card hidden`}
                    className="card"
                /><img
                    key={3}
                    src={hiddenCard}
                    alt={`Card hidden`}
                    className="card"
                /><img
                    key={4}
                    src={hiddenCard}
                    alt={`Card hidden`}
                    className="card"
                /><img
                    key={5}
                    src={hiddenCard}
                    alt={`Card hidden`}
                    className="card"
                />
            </div>
        )
    }
};

const Card = ({ id, src, onClick }) => {
    const [clicked, setClicked] = useState(false)
    return (
        <img
            src={src}
            alt='card'
            className={`card ${clicked && 'selected'}`}
            onClick={() => { onClick(id); setClicked(!clicked) }}
        />
    )
}

export default Player;