// Importando os elementos do HTML
const text = document.querySelector("#text")
const upload = document.querySelector("#upload")
const voice = document.querySelector("#voice")
const listenBtn = document.querySelector("#listen-btn")
const downloadBtn = document.querySelector("#download-btn")

const speak = new SpeechSynthesisUtterance()

// Implementando a action-box de Voice
let availableVoices = []

const attValues = () => {
    availableVoices = window.speechSynthesis.getVoices()

    speak.voice = availableVoices[0]

    console.log(availableVoices)

    availableVoices.forEach((voices, index) => {
        const option = document.createElement("option")
        option.value = index
        option.textContent = voices.name
        voice.appendChild(option)
    })
}

window.speechSynthesis.onvoiceschanged = attValues

// Para trocar a voz para o valor escolhido
voice.addEventListener("change", () => {
    speak.voice = availableVoices[voice.value]
})

// Para executar a voz
listenBtn.addEventListener("click", () => {
    speak.text = text.value

    window.speechSynthesis.speak(speak)
})

// Para Salvar o texto escrito
downloadBtn.addEventListener("click", () => {
    const downText = text.value

    const blob = new Blob([downText], { type: "text/plain" })

    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")

    a.href = url
    a.download = "conversor.txt"
    a.click()

    URL.revokeObjectURL(url)
})

// Para ler o arquivo carregado
upload.addEventListener("change", (event) => {
    const archive = event.target.files[0]

    if (archive) {
        const reader = new FileReader()
        reader.onload = (e) => {
            text.value = e.target.result
        }

        reader.readAsText(archive)
    }
})
//parei 14:02min