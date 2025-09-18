var bd;
const maxFallos = 6;
let palabra = "";
let categoria = "";
let palabraMostrada = [];
let letrasUsadas = [];
let fallos = 0;
let victorias = 0;
let derrotas = 0;


const palabras = {
    animales: ["gato", "perro", "elefante", "tigre"],
    frutas: ["manzana", "pera", "sandia", "melon"],
    paises: ["colombia", "mexico", "argentina", "chile"]
};

function abrirBD() {
    const solicitud = indexedDB.open("AhorcadoDB", 1);

    solicitud.onupgradeneeded = e => {
        bd = e.target.result;
        bd.createObjectStore("partidas", { keyPath: "id", autoIncrement: true });
    };

    solicitud.onsuccess = e => {
        bd = e.target.result;
        cargarHistorial();
    };

    solicitud.onerror = () => alert("Error al abrir BD");
}

function guardarPartida(resultado) {
    const trans = bd.transaction("partidas", "readwrite");
    const store = trans.objectStore("partidas");
    store.add({
        palabra,
        categoria,
        resultado,
        fecha: new Date().toLocaleString()
    });

    trans.oncomplete = cargarHistorial;
}


function cargarHistorial() {
    const trans = bd.transaction("partidas", "readonly");
    const store = trans.objectStore("partidas");
    const req = store.openCursor();
    const historial = document.getElementById("historial");
    historial.innerHTML = "";

    req.onsuccess = e => {
        const cursor = e.target.result;
        if (cursor) {
            const { palabra, categoria, resultado, fecha } = cursor.value;
            historial.innerHTML += `
        <tr>
          <td>${palabra}</td>
          <td>${categoria}</td>
          <td>${resultado}</td>
          <td>${fecha}</td>
        </tr>`;
            cursor.continue();
        }
    };
}


function iniciarJuego() {
    categoria = document.getElementById("categoria").value;
    const lista = palabras[categoria];
    palabra = lista[Math.floor(Math.random() * lista.length)];
    palabraMostrada = Array(palabra.length).fill("_");
    letrasUsadas = [];
    fallos = 0;
    actualizarPantalla();
    generarTeclado();
}


function generarTeclado() {
    const teclado = document.getElementById("teclado");
    teclado.innerHTML = "";
    for (let i = 65; i <= 90; i++) {
        const letra = String.fromCharCode(i).toLowerCase();
        const btn = document.createElement("button");
        btn.textContent = letra;
        btn.onclick = () => elegirLetra(letra, btn);
        teclado.appendChild(btn);
    }
}


function elegirLetra(letra, btn) {
    if (letrasUsadas.includes(letra)) return;
    letrasUsadas.push(letra);
    btn.disabled = true;

    if (palabra.includes(letra)) {
        palabra.split("").forEach((l, i) => {
            if (l === letra) palabraMostrada[i] = letra;
        });
    } else {
        fallos++;
    }

    verificarJuego();
    actualizarPantalla();
}


function verificarJuego() {
    if (!palabraMostrada.includes("_")) {
        alert("¡Ganaste! 🎉");
        victorias++;
        document.getElementById("victorias").textContent = victorias;
        guardarPartida("Victoria");
    } else if (fallos >= maxFallos) {
        alert("Perdiste. La palabra era: " + palabra);
        derrotas++;
        document.getElementById("derrotas").textContent = derrotas;
        guardarPartida("Derrota");
    }
}

// Actualizar pantalla
function actualizarPantalla() {
    document.getElementById("palabraOculta").textContent = palabraMostrada.join(" ");
    document.getElementById("letrasUsadas").textContent = letrasUsadas.join(", ");
    document.getElementById("dibujo").textContent = obtenerDibujo();
}

// Dibujo simple
function obtenerDibujo() {
    const dibujos = [
        ` 
      
    `,
        `
      O
        
    `,
        `
      O
      |
      

    `,
        `
      O
     /|
      
      
    `,
        `
      O
     /|\\
      
      
      
    `,
        `
      O
     /|\\
     / 
      
      
    `,
        `
      O
     /|\\
     / \\
      
      
    `
    ];
    return dibujos[fallos];
}

document.getElementById("btnIniciar").addEventListener("click", iniciarJuego);

abrirBD();


/*var bd;
var cajaContactos;


function iniciarBaseDatos() {
    cajaContactos = document.querySelector(".cajaContactos");
    var btnGuardar = document.querySelector("#btnGuardar");
    btnGuardar.addEventListener("click", GuardarContacto);
    var solicitud = indexedDB.open("Datos-De-Contacto");

    solicitud.addEventListener("error", MostrarError);
    solicitud.addEventListener("success", Comenzar);
    solicitud.addEventListener("upgradeneeded", CrearAlmacen);
}

function MostrarError(evento) {
    alert("Error al abrir la base de datos: " + evento.code + " / " + evento.message);
}

function Comenzar(evento) {
    bd = evento.target.result;
}

function CrearAlmacen(evento) {
    var baseDatos = evento.target.result;
    var almacen = baseDatos.createObjectStore("Contactos", {keyPath: "id"});
    almacen.createIndex("BuscarNombre", "nombre", {unique: false});
}

function GuardarContacto() {
    var n = document.querySelector("#nombre").value;
    var i = document.querySelector("#id").value;
    var e = document.querySelector("#edadd").value;

    var transaccion = bd.transaction(["Contactos"], "readwrite");
    //abrir el almacen
    var almacen = transaccion.objectStore("Contactos");

    almacen.add({nombre: n, id: i, edad: e});

    document.querySelector("#nombre").value = "";
    document.querySelector("#id").value = "";
    document.querySelector("#edadd").value = "";
}

window.addEventListener("load", iniciarBaseDatos);




//todo lo que signifique modificar es readwrite


function MostrarContactos() {
    cajaContactos.innerHTML = "";

    var transaccion = bd.transaction(["Contactos"], "readonly");
}

*/