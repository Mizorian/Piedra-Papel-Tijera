// Este array no se puede modificar
var posibilidades = ["piedra", "papel", "tijera"];
//    //

// Declaracion de variables globales
let partidasTotales = 0; // Definimos la variable para el total de partidas
let partidasActuales = 0; // Definimos la variable para el total de partidas actuales
let nombreJugador = ""; // Establecemos el nombre del jugador de inicio

// Funciones para nuestro juego

// Funcion para validar el nombre
function validarNombre(nombre) {
    // Validamos que el nombre tenga mas de 3 caracteres y que el primero no sea un numero
    if (typeof nombre !== "string") return false; // Verificamos que el nombre sea una cadena
    return nombre.length > 3 && isNaN(nombre[0]);
}

// Función para validar el numero de partidas
function validarPartidas(partidas) {
    // Validamos que el numero de partidas sea mas de 0
    const numPartidas = Number(partidas); // Convertimos a numero para evitar problemas
    return numPartidas > 0;
}

// Funcion para comenzar el juego
function iniciarJuego() {
    const nombreInput = document.querySelector('input[name="nombre"]'); // Obtenemos el input del nombre
    const partidasInput = document.querySelector('input[name="partidas"]'); // Obtenemos el input de partidas
    const totalSpan = document.getElementById('total'); // Nos muestra el total de partidas que llevamos
    let imagenesJugador = document.querySelectorAll('#jugador img'); // Nos muestra las imagenes del jugador

    // Cambiamos las imagenes a las correspondientes
    imagenesJugador.forEach((imagen, index) => {
        if (imagen.src.includes("defecto.png")){
            imagen.src = `img/${posibilidades[index]}Jugador.png`; // Asignamos las imagenes
        }
    })

    nombreJugador = nombreInput.value; // Obtenemos el valor del nombre del jugador
    partidasTotales = parseInt(partidasInput.value, 10); // Convertimos el valor de partidas a numero

    // Validamos el nombre, si es invalido, lo marca en rojo
    if (!validarNombre(nombreJugador)) {
        nombreInput.classList.add('fondoRojo');
    } else {
        nombreInput.classList.remove('fondoRojo');
    }

    // Validamos el namero de partidas, si es invalido, lo marca en rojo
    if (!validarPartidas(partidasTotales)) {
        partidasInput.classList.add('fondoRojo');
    } else {
        partidasInput.classList.remove('fondoRojo');
    }

    // Si ambas son válidas, desactivamos el campo nombre y partidas y lo volcamos todo en span
    if (validarNombre(nombreJugador) && validarPartidas(partidasTotales)) {
        totalSpan.textContent = partidasTotales; // Mostramos el total de partidas
        nombreInput.disabled = true;
        partidasInput.disabled = true;
    }
}

// Creamos una funcion para seleccionar la opcion del jugador
function seleccionarOpcion(event) {
    const imgs = document.querySelectorAll('#jugador img'); // Seleccionamos todas las imagenes del jugador

    // Aseguramos que todas las imagenes tengan la clase 'noSeleccionado'
    imgs.forEach(img => img.classList.remove('seleccionado', 'noSeleccionado'));
    imgs.forEach(img => img.classList.add('noSeleccionado'));

    // Marcamos la imagen seleccionada con la clase 'seleccionado'
    event.target.classList.add('seleccionado');
    event.target.classList.remove('noSeleccionado');
}

// Creamos la funcion para hacer la tirada
function realizarTirada() {
    if (partidasActuales >= partidasTotales) {
        alert("No le quedan partidas disponibles"); // El jugador no puede jugar mas partidas de las permitidas
        return;
    }

    // Establecemos la opcion seleccionada por el jugador
    let seleccionJugador = document.querySelector('#jugador .seleccionado');
    if (!seleccionJugador) {
        alert("Selecciona una opcion valida para jugar"); // El jugador debe elegir una opcion antes de jugar
        return;
    }

    // Establecemos la opcion seleccionada por el jugador
    let eleccionJugador = seleccionJugador.src.split('/').pop().split('.')[0];

    // Establecemos la opcion seleccionada por la maquina
    let eleccionMaquina = posibilidades[Math.floor(Math.random() * posibilidades.length)];
    let maquinaImg = document.querySelector('#maquina img'); // Establecemos la imagen de la maquina

    maquinaImg.src = `img/${eleccionMaquina}.png`; // Mostramos la eleccion de la maquina

    // Determinamos el resultado
    let resultado = determinarGanador(eleccionJugador, eleccionMaquina);
    actualizarHistorial(resultado); // Agregamos el resultado al historial

    partidasActuales++; // Actualizamos el total de partidas actuales
    document.getElementById('actual').textContent = partidasActuales; // Actualizamos el contador en la interfaz
}

// Funcion para determinar el ganador
function determinarGanador(eleccionJugador, eleccionMaquina) {

    //Establecemos la imagen del jugador segun su eleccion
    let jugadorImg = document.querySelector('#jugador img'); // Establecemos la imagen del jugador
    jugadorImg.src = `img/${eleccionJugador}.png`;

    //Establecemos la imagen de la maquina segun su eleccion
    let maquinaImg = document.querySelector('#maquina img'); // Establecemos la imagen de la maquina

    //Mostramos la imagen en funcion de la eleccion de la maquina
    if (eleccionMaquina === "piedra") {
        maquinaImg.src = "img/piedraOrdenador.png";
    } else if (eleccionMaquina === "papel") {
        maquinaImg.src = "img/papelOrdenador.png";
    } else if (eleccionMaquina === "tijera") {
        maquinaImg.src = "img/tijeraOrdenador.png";
    }

    // Establecemos quien es el ganador
    const indexJugador = posibilidades.indexOf(eleccionJugador); // Indice de la eleccion del jugador
    const indexMaquina = posibilidades.indexOf(eleccionMaquina); // Indice de la eleccion de la maquina

    // LOgica circular para determinar el ganador
    if (indexJugador === indexMaquina) {
        return "Empate";
    } else if ((indexJugador + 1) % posibilidades.length === indexMaquina) {
        return "Gana la maquina";
    } else {
        return "Gana " + nombreJugador;
    }
}

// Funcion para actualizar el historial
function actualizarHistorial(resultado) {
    let historial = document.getElementById('historial');
    let li = document.createElement('li'); // Creamos un nuevo elemento para la lista
    li.textContent = resultado; // Agregamos el resultado como texto del elemento
    historial.appendChild(li); // Agregamos el resultado a la lista
}

// Funcion para resetear la partida
function resetearJuego() {
    actualizarHistorial("Nueva partida"); // Anadimos el mensaje de nueva partida al historial
    document.querySelector('input[name="nombre"]').disabled = false; // Reactivamos el campo nombre
    document.querySelector('input[name="partidas"]').disabled = false; // Reactivamos el campo partidas
    document.getElementById('total').textContent = 0; // Reseteamos el total de partidas
    document.getElementById('actual').textContent = 0; // Reseteamos el total de partidas actuales
    document.querySelector('input[name="partidas"]').value = 0; // Reiniciamos el valor de partidas del input

    document.querySelector('#maquina img').src = "img/defecto.png"; // Reiniciamos la imagen de la maquina

    partidasActuales = 0; // Dejamos el contador de partidas a 0
}

// Eventos para comprobar la eleccion del jugador
document.querySelector('button:nth-of-type(1)').addEventListener('click', iniciarJuego);
document.querySelectorAll('#jugador img').forEach(img => img.addEventListener('click', seleccionarOpcion));
document.querySelector('h2 button').addEventListener('click', realizarTirada);
document.querySelector('div button:last-of-type').addEventListener('click', resetearJuego);