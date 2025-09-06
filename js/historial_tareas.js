const form = document.forms['agregarDescrip'];

const msg = document.getElementById('saludo');
const date = document.getElementById('fecha');
const prueba = document.getElementById('prueba');

const mostrar = (descripcion, fecha) => {
    msg.textContent = `descripcion = ${descripcion}`;
    date.textContent = `fecha = ${fecha}`;

    const p = document.createElement('p');
    p.textContent = descripcion;
    const div = document.createElement('div');
    div.textContent = fecha;

    prueba.appendChild(p);
    prueba.appendChild(div);
}



const log = (text, fecha) => {
    const num = localStorage.length;
    localStorage.setItem(`log-${num}`, `${text} ${fecha}`);     
    localStorage.setItem(`tarea-${num}`,JSON.stringify({
        text, fecha
    }));
    const o = JSON.parse(localStorage.getItem(`tarea-${num}`));
    console.log(o.text, o.fecha)
}



form.addEventListener('submit' , (ev) => {
    ev.preventDefault();
    const desc = form['desc'].value;
    const date = form['fecha'].value;
    mostrar(desc, date);
})

form.addEventListener('click' , () => {
    log(`El usuario ingreso: ${descripcion}`, `Para el ${fecha}`);
})










