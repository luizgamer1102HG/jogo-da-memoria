
const dadosJogo = {
    "verso_carta": "imagens/Deltarune_Icon.png",
    "dificuldades": {
        "escolha": {
            "nome": null,
            "coluna": 4,
            "cartas": null
        },
        "facil": {
            "nome": "Fácil",
            "colunas": 4,
            "cartas": [
                { "id": "item_1", "imagem": "imagens/angular.svg" },
                { "id": "item_2", "imagem": "imagens/aurelia.svg" },
                { "id": "item_3", "imagem": "imagens/ember.svg" },
                { "id": "item_4", "imagem": "imagens/vue.svg" }
            ]
        },
        "medio": {
            "nome": "Médio",
            "colunas": 4,
            "cartas": [
                { "id": "item_1", "imagem": "imagens/angular.svg" },
                { "id": "item_2", "imagem": "imagens/aurelia.svg" },
                { "id": "item_3", "imagem": "imagens/ember.svg" },
                { "id": "item_4", "imagem": "imagens/vue.svg" },
                { "id": "item_5", "imagem": "imagens/js-badge.svg" },
                { "id": "item_6", "imagem": "imagens/backbone.svg" }
            ]
        },
        "dificil": {
            "nome": "Difícil",
            "colunas": 6,
            "cartas": [
                { "id": "item_1", "imagem": "imagens/angular.svg" },
                { "id": "item_2", "imagem": "imagens/aurelia.svg" },
                { "id": "item_3", "imagem": "imagens/ember.svg" },
                { "id": "item_4", "imagem": "imagens/vue.svg" },
                { "id": "item_5", "imagem": "imagens/js-badge.svg" },
                { "id": "item_6", "imagem": "imagens/backbone.svg" },
                { "id": "item_7", "imagem": "imagens/react.svg" },
                { "id": "item_8", "imagem": "imagens/Undertale.png" },
                { "id": "item_9", "imagem": "imagens/76057-icons-computer-youtube-soul-undertale-png-file-hd-thumb.png" }
            ]
        }
    }
};

let cartaVirada = false;
let travarTabuleiro = false;
let primeiraCarta = null;
let segundaCarta = null;
let paresEncontrados = 0;
let totalPares = 0;


window.addEventListener('DOMContentLoaded', () => {
    iniciarJogo('escolha');
});



function iniciarJogo(nivelKey) {
    const nivel = dadosJogo.dificuldades[nivelKey];
    if (!nivel) return;

    const tabuleiro = document.getElementById('tabuleiro');
    tabuleiro.innerHTML = '';
    resetarEstado();

    totalPares = nivel.cartas.length;
    paresEncontrados = 0;


    tabuleiro.style.gridTemplateColumns = `repeat(${nivel.colunas}, 1fr)`;


    const baralho = embaralhar([...nivel.cartas, ...nivel.cartas]);


    baralho.forEach(carta => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('memory-card');
        cardElement.dataset.id = carta.id;

        const frente = document.createElement('img');
        frente.classList.add('front-face');
        frente.src = carta.imagem;
        frente.alt = carta.id;

        const verso = document.createElement('img');
        verso.classList.add('back-face');
        verso.src = dadosJogo.verso_carta;
        verso.alt = 'Verso da carta';

        cardElement.appendChild(frente);
        cardElement.appendChild(verso);
        cardElement.addEventListener('click', virarCarta);

        tabuleiro.appendChild(cardElement);
    });
}

function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function virarCarta() {
    if (travarTabuleiro || this === primeiraCarta) return;

    this.classList.add('flip');

    if (!cartaVirada) {
        cartaVirada = true;
        primeiraCarta = this;
        return;
    }

    segundaCarta = this;
    checarPar();
}

function checarPar() {
    const ehPar = primeiraCarta.dataset.id === segundaCarta.dataset.id;

    if (ehPar) {
        desativarCartas();
        paresEncontrados++;

        if (paresEncontrados === totalPares) {
            setTimeout(() => {
                alert('Parabéns! Você completou este nível!');
            }, 400);
            iniciarJogo('escolha');
        }
    } else {
        desvirarCartas();
    }
}

function desativarCartas() {
    primeiraCarta.removeEventListener('click', virarCarta);
    segundaCarta.removeEventListener('click', virarCarta);
    resetarEstado();
}

function desvirarCartas() {
    travarTabuleiro = true;
    setTimeout(() => {
        primeiraCarta.classList.remove('flip');
        segundaCarta.classList.remove('flip');
        resetarEstado();
    }, 900);
}

function resetarEstado() {
    [cartaVirada, travarTabuleiro] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
}