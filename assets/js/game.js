const gameSta = document.querySelector('#game-start');
const gameSel = document.querySelector('#game-select');
const gameCon = document.querySelector('#game-container');
const btnStart = document.querySelector('#start');
const btnSelect = document.querySelectorAll('.btn-inseto');
const timeEl = document.getElementById("tempo");
const pontoEl = document.getElementById("placar");
let pontos = [0, 0];
let selInset = "";
let sec = 0;
let intervalID;
let insetosIntervalID;
let insetosCount = 1;

btnStart.addEventListener('click', () => {
    gameSta.style.display = 'none';
    gameSel.style.display = 'grid';
});

btnSelect.forEach(btn => {
    btn.addEventListener('click', (e) => {
        selInset = btn.id;
        gameSel.style.display = 'none';
        gameCon.style.display = 'block';
        startGame();
    });
});

function startGame() {
    intervalID = setInterval(contaTempo, 1000);
    startInsetosInterval();
}

function contaTempo() {
    let m = Math.floor(sec / 60);
    let s = sec % 60;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    timeEl.innerHTML = `Tempo: <span id="time">${m}:${s}</span>`;
    pontoEl.innerHTML = `Insetos Mortos <span id="human">${pontos[0]}</span>`
    sec++;
    if (sec >= 301) { 
        clearInterval(intervalID);
        clearInterval(insetosIntervalID);
        alert("Acabou o tempo! Insetos Mortos " + pontos[0]);
    }
}

function criaInseto() {
    const inseto = document.createElement('div');
    inseto.classList.add('shwInseto');
    const { x, y} = rdmLocal();
    inseto.style.top = `${y}px`
    inseto.style.left = `${x}px`
    inseto.innerHTML = `<img src="./assets/Image/${selInset}.png" alt="${selInset}" style="transform: rotate(${Math.random() * 360}deg)" />`

    inseto.addEventListener('click', () => pegaInseto(inseto));
    gameCon.appendChild(inseto);

    setTimeout(() => {
        if (!inseto.classList.contains('pego')) {
            pontosI();
            removeInseto(inseto);
        }
    }, 3000);
}

function startInsetosInterval() {
    for (let i = 0; i < insetosCount; i++) {
        criaInseto();
    }

    insetosIntervalID = setInterval(() => {
        if (document.querySelectorAll('.shwInseto:not(.pego)').length === 0) {
            if (insetosCount >= 32) {
                insetosCount = 32;
            }
            for (let i = 0; i < insetosCount; i++) {
                criaInseto();
            }
        }
    }, 2000);

    lvlInsetosID = setInterval(() =>{
        lvlInsetos();
    }, 10000)
}

function rdmLocal() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
}

function pegaInseto(inseto) {
    if (!inseto.classList.contains('pego')) {
        pontosH();
        removeInseto(inseto);
    }
}

function removeInseto(inseto) {
    inseto.classList.add('pego');
    setTimeout(() => {
        inseto.remove();
    }, 200);
}

function pontosH() {
    pontos[0]++;
}

function pontosI() {
    pontos[1]++;
}

function lvlInsetos() {
    insetosCount *= 2;
}
