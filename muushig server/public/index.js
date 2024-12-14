const socket = io();
const cardsDiv = document.getElementById('cards')
const statusDiv = document.getElementById('status')
const gazriinmodDiv = document.getElementById('gazriin-mod')
const remainingDiv = document.getElementById('remaining')
const changeCardBtn = document.getElementById('changeCardBtn')
const startBtn = document.getElementById('startBtn')

const form = document.getElementById("idkForm")
const username = document.getElementById('username')
const file = document.getElementById('file')
const submitter = document.getElementById('formSubmit')
const formData = new FormData(form, submitter)


let huzurSolison = false
const showCards = (players) => {
    cardsDiv.innerText = ''
    let i = 0
    players[socket.id].forEach(card => {
        if (!card) {
            return
        }
        let suit = card['suit'].slice(0, 1)
        let btn = document.createElement('div')
        btn.classList.add('card-btn')
        btn.setAttribute('index', i)
        btn.addEventListener('click', function () {
            this.classList.toggle('active')
            showChangecard()
        })

        let img = document.createElement('img')
        img.classList.add('card')
        img.src = `/static/cards/${card['rank']}${suit}.png`
        btn.appendChild(img)
        cardsDiv.appendChild(btn)
        i += 1
    })
}

socket.on('connect', () => {
    socket.emit('add', socket.id);
});

socket.on('update', (players, remaining) => {
    console.log('updated')
    if (remaining != false) {
        remainingDiv.innerText = remaining
    }
    showCards(players)
})

socket.on('gazriin-mod', card => {
    gazriinmodDiv.innerText = ''
    img = document.createElement('img')
    let suit = card['suit'].slice(0, 1)
    img.classList.add('card')
    img.src = `/static/cards/${card['rank']}${suit}.png`
    gazriinmodDiv.appendChild(img)
})

socket.on('restarted', () => {
    startBtn.disabled = false
})

socket.on('huzurSolison', (players, remaining) => {
    if (remaining != false) {
        remainingDiv.innerText = remaining
    }
    showCards(players)
    huzurSolison = true
})

const showChangecard = () => {
    if (!huzurSolison) {
        selected_cards = document.getElementsByClassName('card-btn active')
        if (selected_cards.length > 0) {
            changeCardBtn.style.display = 'block'
        }
        else {
            changeCardBtn.style.display = 'none'
        }
    }
}

const restartGame = () => {
    socket.emit('restart')
}

const startGame = () => {
    socket.emit('start')
    startBtn.innerText = 'READY'
    startBtn.disabled = true
}

const changeCards = () => {
    selectedIndex = []
    selected_cards = document.getElementsByClassName('card-btn active')
    for (let i = 0; i < selected_cards.length; i++) {
        card = selected_cards[i]
        selectedIndex.push(card.getAttribute('index'))
    }
    socket.emit('changeCards', selectedIndex)
    changeCardBtn.style.display = 'none'
}

socket.on('added', () => {
    // socket.emit('start')
})


sendForm = async () => {
    // const url = window.location.host+'/upload'
    try {
        let formdata = new FormData()
        formdata.append('file', document.forms['form1']['file'].files[0])
        formdata.append('username', document.forms['form1']['username'].value)
        let data = {
            'file': document.forms['form1']['file'].files[0],
            'username':document.forms['form1']['username'].value
        }
        const response = await fetch('/upload', {
            method: "POST",
            body:formdata
        }).then(r=>{
            return r
        }).then(r=>{
            console.log(r)
        }).catch(err=>{
            console.error(err)
        })
    } catch (error) {
        console.error(error.message);
    }
}

window.onload = async ()=>{
    await fetch('/profile?username=itgel.webp',).then(r=>{
        img = document.createElement('img')
        img.classList.add('pfp')
        img.src = '/static/profilePictures/itgel.webp'
        document.getElementById('profile').appendChild(img)
    })
}