const tablero = document.getElementById("tablero");
const intentosSpan = document.getElementById("intentos");
const tiempoSpan = document.getElementById("tiempo");
const mejorTiempoSpan = document.getElementById("mejorTiempo");
const mejoresIntentosSpan = document.getElementById("mejoresIntentos");
const btnFacil = document.getElementById("btnFacil");
const btnMedio = document.getElementById("btnMedio");
const btnDificil = document.getElementById("btnDificil");


let cartas = [];
let primera = null;
let segunda = null;
let bloqueado = false;
let intentos = 0;
let tiempo = 0;
let timer = null;
let parejasEncontradas = 0;
let totalParejas = 0;

// Lista de imágenes ejemplo (puedes usar tus propias rutas)
const todasImagenes = [
    "🐱", "🐶", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼",
    "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐤",
    "🐧", "🐦", "🐴", "🦄", "🐝", "🐛", "🦋", "🐌",
    "🐞", "🐜", "🦟", "🦗", "🕷", "🦂", "🐢", "🐍",
    "🦎", "🦖", "🦕", "🐙", "🦑", "🦐", "🦞", "🦀",
    "🐡", "🐠", "🐟", "🐬", "🐳", "🐋", "🦈", "🐊",
    "🐆", "🐅", "🐃", "🐂", "🐄", "🐪", "🐫", "🦙",
    "🦒", "🐘", "🦏", "🦛", "🐎", "🐖", "🐏", "🐑",
    "🦌", "🐐", "🦢", "🦜", "🦩", "🦚", "🦉", "🦅",
    "🦆", "🦃", "🐓", "🐊"
];

// Mezclar array
function aleatorio(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Crear tablero
function crearTablero(dificultad) {
    tablero.innerHTML = "";
    intentosSpan.textContent = 0;
    tiempoSpan.textContent = 0;
    clearInterval(timer);

    let totalCartas = dificultad * dificultad;
    totalParejas = totalCartas / 2;

    let seleccion = todasImagenes.slice(0, totalParejas);
    let imagenes = aleatorio([...seleccion, ...seleccion]);

    tablero.style.gridTemplateColumns = `repeat(${dificultad}, 60px)`;
    tablero.style.gridTemplateRows = `repeat(${dificultad}, 60px)`;


    imagenes.forEach(img => {
        const carta = document.createElement("div");
        carta.classList.add("carta");
        carta.dataset.valor = img;
        carta.innerHTML = `
          <div class="cara frontal"></div>
          <div class="cara trasera">${img}</div>
        `;
        carta.addEventListener("click", () => voltearCarta(carta));
        tablero.appendChild(carta);
        cartas.push(carta);
    });

    // Iniciar timer
    timer = setInterval(() => {
        tiempo++;
        tiempoSpan.textContent = tiempo;
        sessionStorage.setItem("progreso", JSON.stringify({ dificultad, intentos, tiempo, cartas: cartas.map(c => ({ valor: c.dataset.valor, volteada: c.classList.contains("volteada") })) }));
    }, 1000);
}

function voltearCarta(carta) {
    if (bloqueado || carta.classList.contains("volteada")) return;

    carta.classList.add("volteada");

    if (!primera) {
        primera = carta;
    } else if (!segunda) {
        segunda = carta;
        intentos++;
        intentosSpan.textContent = intentos;

        if (primera.dataset.valor === segunda.dataset.valor) {
            primera = null;
            segunda = null;
            parejasEncontradas++;
            if (parejasEncontradas === totalParejas) finJuego();
        } else {
            bloqueado = true;
            setTimeout(() => {
                primera.classList.remove("volteada");
                segunda.classList.remove("volteada");
                primera = null;
                segunda = null;
                bloqueado = false;
            }, 1000);
        }
    }
}

// Fin del juego
function finJuego() {
    clearInterval(timer);

    // guardar mejor resultado
    let mejor = JSON.parse(localStorage.getItem("mejor")) || { tiempo: Infinity, intentos: Infinity };
    if (tiempo < mejor.tiempo) mejor.tiempo = tiempo;
    if (intentos < mejor.intentos) mejor.intentos = intentos;
    localStorage.setItem("mejor", JSON.stringify(mejor));

    mejorTiempoSpan.textContent = mejor.tiempo;
    mejoresIntentosSpan.textContent = mejor.intentos;

    alert(`¡Ganaste! Tiempo: ${tiempo}s, Intentos: ${intentos}`);
}

// Cargar mejor puntuación al inicio
let mejor = JSON.parse(localStorage.getItem("mejor"));
if (mejor) {
    mejorTiempoSpan.textContent = mejor.tiempo;
    mejoresIntentosSpan.textContent = mejor.intentos;
}

// Botones dificultad
document.querySelectorAll("button[data-dificultad]").forEach(btn => {
    btn.addEventListener("click", () => {
        let dif = parseInt(btn.dataset.dificultad);
        crearTablero(dif);
    });
});
