import { Server } from 'socket.io';
import express from 'express';
import multer from 'multer';
import http from 'http';
import path from 'path';
import cors from 'cors';

import Deck from './cardFunctions.js';
import { generateCode } from './roomFunctions.js';


const __dirname = path.resolve();
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/profilePictures')
    },
    filename: function (req, file, cb) {
        console.log(file.originalname)
        const uniqueSuffix = req.body.username + file.originalname.split('.')[1]
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage })


app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/main.html'))
})

app.post('/upload', upload.single('file'), (req, res) => {
    // console.log('file recieved',req.file)
    res.send(req.file)
}, (error, req, res, next) => {
    res.status(400).send(JSON.stringify({ error: error.message }))
    console.log(error)
})

app.get('/profile', (req, res) => {
    console.log(req.query)
    // res.sendFile(path.join(__dirname,`/public/profilePictures/${req.query.username}`))
    res.json({
        url: `/public/profilePictures/${req.query.username}`
    })
})

const rooms = {}

io.on('connection', (socket) => {
    const newRoom = (code = null) => {
        let roomCode;
        if (code) {
            roomCode = code
        } else {
            do {
                roomCode = generateCode();
            } while (rooms[roomCode]);
        }


        let deck = new Deck()
        deck.addPlayer(socket.id)

        rooms[roomCode] = {
            deck: deck,
            winner: null,
        };

        socket.join(roomCode);
        updateRoom(roomCode)

        io.to(roomCode).emit('createRoom', roomCode);
        console.log(`Room created: ${roomCode}`);
    }

    const updateRoom = (roomCode) => {
        io.to(roomCode).emit('update', {
            turn: rooms[roomCode].deck.startTurn,
            winner: rooms[roomCode].winner,
            players: rooms[roomCode].deck.players,
            pool: rooms[roomCode].deck.pool,
            deck: rooms[roomCode].deck.deck,
            started: rooms[roomCode].deck.started
        })
    }

    socket.on('add', roomCode => {
        let deck = rooms[roomCode].deck
        deck.addPlayer(socket.id)
        deck.huzurTaraah()
        // console.log(deck.players)
        io.to(roomCode).emit('added')
        console.log('add', Object.keys(rooms[roomCode].deck.players).length)
    })

    socket.on('start', roomCode => {
        if (!rooms[roomCode]) return console.log('howFUCK?');
        // console.log(rooms[roomCode])
        let deck = rooms[roomCode].deck
        console.log('start')
        if (deck.start(socket.id)) {
            socket.emit('gazriin-mod', deck.getGazriinMod())
            updateRoom(roomCode)
        }
    })

    socket.on('restart', roomCode => {
        let deck = rooms[roomCode].deck
        deck.readyPlayers = []
        deck.emptyPlayerCards()
        io.to(roomCode).emit('restarted')
        io.to(roomCode).emit('gazriin-mod', undefined)
        updateRoom(roomCode)
    })

    socket.on('changeCards', (roomCode, cardIndexes) => {
        let deck = rooms[roomCode].deck
        if (deck.solih(socket.id, cardIndexes)) {
            updateRoom(roomCode)
        }
    })

    socket.on('createRoom', (roomCode) => {
        if (roomCode) {
            newRoom(roomCode)
        }
        newRoom()
    })

    socket.on('joinRoom', (roomCode) => {
        // Check if the room exists
        if (rooms[roomCode]) {
            let deck = rooms[roomCode].deck;

            deck.addPlayer(socket.id);
            socket.join(roomCode);

            // Notify everyone in the room that a player has joined
            // io.to(roomCode).emit('playerJoined', socket.id);
            updateRoom(roomCode)
            console.log(`${socket.id} joined room: ${roomCode}`);
        } else {
            newRoom(roomCode)
        }
    });


    socket.on('disconnect', () => {

        for (const roomCode in rooms) {
            const room = rooms[roomCode];
            const players = room.deck.players;

            const playerIndex = players.findIndex(player => player.id === socket.id);

            if (playerIndex !== -1) {
                console.log(`Removing player with ID ${socket.id} from room ${roomCode}`);

                players.splice(playerIndex, 1);

                // Delete the room
                if (players.length === 0) {
                    console.log(`No players left in room ${roomCode}. Deleting room.`);
                    delete rooms[roomCode];
                }
                break;
            }
        }
    })
})


const PORT = process.env.PORT || 8080
server.listen(PORT, err => {
    if (err) {
        console.log(err)
        return;
    }
    console.log('listening ' + PORT)
})