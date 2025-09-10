    const form = document.forms['agregarDescrip'];
    const prueba = document.getElementById('prueba');

    let registros = JSON.parse(localStorage.getItem("registros")) || [];

    const mostrar = (descripcion, fecha) => {
      const tr = document.createElement('tr');

      const td = document.createElement('td');
      td.textContent = descripcion;

      const td1 = document.createElement('td');
      td1.textContent = fecha;

      tr.appendChild(td);
      tr.appendChild(td1);

      prueba.appendChild(tr);
    }

    const mostrarTodos = () => {
      prueba.innerHTML = "";    //Para asignarle a ese espacio "" osea vacio
      registros.forEach(r => mostrar(r.descripcion, r.fecha));
    }

    const ordenar = () => {
      registros.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    }

    const agregarRegistro = (desc, date) => {
      registros.push({ descripcion: desc, fecha: date });   //Es un arreglo que contiene todos los elementos
        //push es para agregar un nuevo elemento al localstorage
      ordenar();

      localStorage.setItem("registros", JSON.stringify(registros));  //Convertir el arreglo en textocon JSON.stringify
        //Y se guarda asi en el local storage
      mostrarTodos();
    }

    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const desc = form['desc'].value;
      const date = form['fecha'].value;
      agregarRegistro(desc, date);
      form.reset();
    });

    mostrarTodos();
