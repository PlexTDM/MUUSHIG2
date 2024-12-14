class Deck {
    constructor() {
        this.ranks = new Array("A", "7", "8", "9", "10", "J", "Q", "K");

        this.suits = new Array("Clubs", "Diamonds", "Hearts", "Spades");

        this.deck = []
        this.makeDeck()
        this.shuffle()
        this.players = []
        this.readyPlayers = []
        this.huzurSolisonPlayers = []
        this.pool = []
        this.startTurn = 0
        this.started = false
        this.gazriinMod = null
    }

    addPlayer = id => {
        const existingPlayer = this.players.find(player => player.id === id);

        if (existingPlayer) {
            console.log(`Player with id ${id} is already added.`);
            return; // Exit if the player is already in the list
        }

        this.players.push({
            id: id,
            score: 15,
            cards: [],
            playing: true,
        })
    }

    removePlayer = id => {
        delete this.players
    }

    nextTurn = () => {
        this.players.map(player => {
            player.playing = true;
            player.cards = []
        })
        this.startTurn += 1
        if (this.startTurn > this.players.length) {
            this.startTurn = 0
        }

        this.makeDeck()
        this.shuffle()
        this.shuffle()
        this.shuffle()
        this.huzurTaraah()
    }

    restart = () => {
        this.readyPlayers = [];
        this.players.map(player => {
            player.playing = true;
            player.score = 15;
            player.cards = [];
        })
        this.startTurn = 0;
        if (this.startTurn > this.players.length) {
            this.startTurn = 0
        }

        this.makeDeck()
        this.shuffle()
        this.shuffle()
        this.shuffle()
        this.huzurTaraah()
    }

    makeDeck = () => {
        let suits = this.suits
        let ranks = this.ranks
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                this.deck[i * ranks.length + j] = { 'rank': ranks[j], 'suit': suits[i] }
            }
        }
    };
    shuffle() {
        let array = this.deck
        let currentIndex = array.length;

        while (currentIndex != 0) {

            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]]
        }
        this.deck = array
    }

    huzurTaraah = () => {
        this.players.forEach(player => {
            let cards = []
            for (let i = 0; i < 5; i++) {
                cards[i] = this.deck.shift()
            }
            player.cards = cards
        })
        return this.players
    }

    huzurTaslah = (index) => {
        let temp1 = this.deck.slice(0, index)
        let temp2 = this.deck.slice(index, this.deck.length)
        this.deck = Array.prototype.concat(temp2, temp1)
    }

    solih = (playerId, solihHuzriinIndex) => {
        if (this.huzurSolisonPlayers.includes(playerId)) return;

        this.huzurSolisonPlayers.push(playerId)
        for (let i = 0; i < solihHuzriinIndex.length; i++) {
            this.players.cards[solihHuzriinIndex[i]] = this.deck.shift()
        }
        return true

    }

    canChangeCards = () => {
        if (this.deck.length > 0) {
            return this.deck.length
        }
        return false
    }

    hayah = (id) => {
        this.players.map(player => {
            if (player.id == id) {
                player.playing = false
            }
        }) = true
    }

    start = id => {
        // if (!this.readyPlayers.includes(id)) {
        //     this.readyPlayers.push(id)
        // }
        // if (this.readyPlayers.length === this.players.length) {
        this.makeDeck()
        this.shuffle()
        this.shuffle()
        this.shuffle()
        this.huzurTaslah(Math.floor(this.deck.length / 2))
        this.huzurTaraah()
        this.getGazriinMod()
        this.started = true
        return true
        // }
        // return false
    }

    getGazriinMod = () => {
        return this.gazriinMod = this.deck.shift()
    }

    emptyPlayerCards = () => {
        Object.keys(this.players).forEach(id => {
            this.players[id] = []
        })
    }

}

// let deck = new Deck()

// deck.huzurTaraah()
// console.log(deck.players)
// deck.hayah(0)
// console.log(deck.players)
// deck.solih(0,[0,1])

export default Deck