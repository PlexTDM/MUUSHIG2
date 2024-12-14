import React from 'react';

const Button = ({ onClick, value }) => {
    return (
        <button className="button" id='playButton' onClick={onClick}>
            <h1>{value}</h1>
        </button>
    );
};

export default Button;