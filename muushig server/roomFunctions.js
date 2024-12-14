export const generateCode = () => {
    let result = '';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Capital letters
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        result += letters[randomIndex];
    }
    return result;
}

export const checkWinner = (board) => {
}