var bd;
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


//readonly es solo lectura