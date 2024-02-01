const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const startPauseBt = document.querySelector('#start-pause')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const cardIconBt = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')


const audioPlay = new Audio('/sons/play.wav')
const audioPause = new Audio('/sons/pause.mp3')
const audioOver = new Audio('/sons/beep.mp3')


let tempoDecorridoEmSegundos = 1800
let intervaloId = null

musica.loop = true
musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {

    tempoDecorridoEmSegundos = 1800
    alterarContexto('foco');
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal uma respirada?<br>
            <strong class="app__title-strong"> Hora de dar um break!!</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar a superficie.<br>
            <strong class="app__title-strong"> De uma pausa longa</strong>`
            break;
        default:
            break;
    }
}
function voltarParaFoco() {
    const meuBotao = document.getElementById('app__card-button--primeiro')
    meuBotao.click()
}
const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        audioOver.play()
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
            voltarParaFoco()
        }

        pararContador()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
    console.log('Id: ' + intervaloId)
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        audioPause.play()
        pararContador()
        return
    }
    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    cardIconBt.setAttribute('src', `imagens/pause.png`)


}

function pararContador() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    cardIconBt.setAttribute('src', `imagens/play_arrow.png`)
    intervaloId = null
}



function mostrarTempo() {

    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' })
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()
