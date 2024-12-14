import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8080';

const socket = io(URL, {
    autoConnect: false,
    reconnectionAttempts: 3,
    timeout: 5000,
});

// Listen for connection errors
socket.on("connect_error", (err) => {
    console.error("Connection error:", err.message);
    throw new Error(`Socket connection failed: ${err.message}`);
});

export default socket;