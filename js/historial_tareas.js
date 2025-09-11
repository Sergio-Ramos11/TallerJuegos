    const form = document.forms['agregarDescrip'];
    const form1 = document.forms['realizarTarea'];
    const tablaP = document.getElementById('tablaP');
    const tablaC = document.getElementById('tablaC')
    const limpiarBtn = document.getElementById('limpiarBtn');
    const tareaR = document.getElementById('tareaR');
    const contP = document.getElementById('contP');
    const contC = document.getElementById('contC');

    let pendientes = JSON.parse(localStorage.getItem("Pendientes")) || [];

    let completadas = JSON.parse(localStorage.getItem("Completadas")) || [];


////////////////////////////////////////////////////////////////////////////////////////


    const tabla1 = (descripcion, fecha) => {
        contadores();
        const cont = localStorage.length;
        const tr = document.createElement('tr');  
        const td = document.createElement('td');
        td.textContent = descripcion;

        const td1 = document.createElement('td');
        td1.textContent = fecha;

        tr.appendChild(td);
        tr.appendChild(td1);

        tablaP.appendChild(tr);
    }

    const tabla2 = (descripcion, fecha) => {
        const cont = localStorage.length;
        const tr1 = document.createElement('tr');  
        const td1 = document.createElement('td');
        td1.textContent = descripcion;

        const td2 = document.createElement('td');
        td2.textContent = fecha;

        tr1.appendChild(td1);
        tr1.appendChild(td2);

        tablaC.appendChild(tr1);
    }

////////////////////////////////////////////////////////////


    const tareaRealizada = (descripcion) => {
        pendientes.forEach(x => {
           if (descripcion === x.descripcion) {
                completadas.push(x);
                pendientes = pendientes.filter(p => p.descripcion !== descripcion);
                localStorage.setItem("Pendientes" , JSON.stringify(pendientes));
                localStorage.setItem("Completadas" , JSON.stringify(completadas));

                mostrarTabla1();
                mostrarTabla2();
            }  //El método filter recorre cada elemento del array y crea un nuevo array con solo los elementos que cumplen la condición.
        });

    }



    const mostrarTabla2 = () => {
        tablaC.innerHTML = "";    //Para asignarle a ese espacio "" osea vacio
        completadas.forEach(r => tabla2(r.descripcion, r.fecha));
    }


    const mostrarTabla1 = () => {
        tablaP.innerHTML = "";    //Para asignarle a ese espacio "" osea vacio
        pendientes.forEach(r => tabla1(r.descripcion, r.fecha));
    }


    

    const agregarRegistro1 = (desc, date) => {
        pendientes.push({ descripcion: desc, fecha: date });   //Es un arreglo que contiene todos los elementos
        //push es para agregar un nuevo elemento al localstorage
        ordenar();

        localStorage.setItem("Pendientes", JSON.stringify(pendientes));  //Convertir el arreglo en textocon JSON.stringify
        //Y se guarda asi en el local storage
        mostrarTabla1();
    }


    const agregarRegistro2 = (desc, date) => {
        completadas.push({ descripcion: desc, fecha: date });   //Es un arreglo que contiene todos los elementos
        //push es para agregar un nuevo elemento al localstorage
        //ordenar();

        localStorage.setItem("Completadas", JSON.stringify(completadas)); 

        mostrarTabla2();
    }




/////////////////////////////////////////////////////////////

    const contadores = () => {    
        contP.textContent = pendientes.length;
        contC.textContent = completadas.length; 
    }

    
        const ordenar = () => {
        pendientes.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    }

////////////////////////////////////////////////////////////

    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const desc = form['desc'].value;
        const date = form['fecha'].value;
        agregarRegistro1(desc, date);
        form.reset();
    });

    form1.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const desc1 = form1['desc1'].value;
        tareaRealizada(desc1);
    })


    limpiarBtn.addEventListener('click', () => {
        localStorage.clear();
    });
    

    mostrarTabla1();
    mostrarTabla2();
