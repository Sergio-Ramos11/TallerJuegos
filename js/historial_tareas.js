const form = document.forms['agregarDescrip'];

const prueba = document.getElementById('prueba');

const mostrar = (descripcion, fecha) => {
    log(`Descripcion: ${descripcion}`, `Fecha: ${fecha}`);  //imprime en el log y obvio lo tengo que llamar

    const tr = document.createElement('tr');

    const td = document.createElement('td');              //se crea una etiqueta p vacia 
    td.textContent = descripcion;                        //para asignarle lo que hay en descripcion
    const td1 = document.createElement('td');
    td1.textContent = fecha;

    tr.appendChild(td);          //Imprime dentro de div en una etiqueta p
    tr.appendChild(td1);

    prueba.appendChild(tr);
}



const log = (text, fecha) => {
    
    const num = localStorage.length;
    //localStorage.setItem(`tarea-${num}`, `${text} ${fecha}`);     
    localStorage.setItem(`tarea-${num}`,JSON.stringify({
        text, fecha
    }));
    const o = JSON.parse(localStorage.getItem(`tarea-${num}`));
    console.log(o.text, o.fecha);
    
}



form.addEventListener('submit' , (ev) => {
    ev.preventDefault();
    const desc = form['desc'].value;
    const date = form['fecha'].value;
    mostrar(desc, date);
})
/*
form.addEventListener('click' , () => {
    
})
*/
