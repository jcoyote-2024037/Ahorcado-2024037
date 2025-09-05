var palabraSeleccionada = "";
var guiones = [];
var intentos = 0;
var maxIntentos = 7;
var enJuego = false;
var tiempoRestante = 0;
var cronometroIntervalo;

// TECLADO
function Teclado() {
    let teclado = document.getElementById("teclado");
    teclado.innerHTML = "";
    let letras = "ABCDEFGHIJKLMN\u00D1OPQRSTUVWXYZ".split(""); 

    letras.forEach(l => {
        let btn = document.createElement("button");
        btn.innerText = l;
        btn.onclick = () => adivinarLetra(l, btn);
        teclado.appendChild(btn);
    });
}

// INICIAR JUEGO
function iniciarJuego() {
    let aleatoria = Math.floor(Math.random() * palabras.length);
    let obj = palabras[aleatoria];

    palabraSeleccionada = obj.palabra.toUpperCase();
    guiones = Array(palabraSeleccionada.length).fill("_");
    intentos = 0;
    enJuego = true;

    document.getElementById("palabra").innerText = guiones.join(" ");
    document.getElementById("imagenAhorcado").src = "img/1.jpg";
    document.getElementById("pista1").innerText = obj.pistas[0];
    document.getElementById("pista2").innerText = obj.pistas[1];
    document.getElementById("pista3").innerText = obj.pistas[2];
    document.getElementById("mensaje").innerText = "Adivina la Palabra";

    Teclado();

    tiempoRestante = 600;
    actualizarCronometro();
    cronometroIntervalo = setInterval(actualizarCronometro, 1000);
}

// ADIVINAR LETRA
function adivinarLetra(letra, boton) {
    if (!enJuego)
        return;

    boton.disabled = true;
    let acierto = false;

    for (let i = 0; i < palabraSeleccionada.length; i++) {
        if (palabraSeleccionada[i] === letra && guiones[i] === "_") {
            guiones[i] = letra;
            acierto = true;
        }
    }

    if (!acierto) {
        intentos++;
        document.getElementById("imagenAhorcado").src = "img/" + (intentos + 1) + ".jpg";
    }

    document.getElementById("palabra").innerText = guiones.join(" ");

    if (!guiones.includes("_")) {
        document.getElementById("mensaje").innerText = "Ganaste, la palabra era " + palabraSeleccionada + ".";
        finalizarJuego();
    }

    if (intentos >= maxIntentos) {
        document.getElementById("mensaje").innerText = "Perdiste, la palabra era " + palabraSeleccionada + ".";
        finalizarJuego();
    }
}

// FUNCIÓN PARA ACTUALIZAR EL CRONÓMETRO
function actualizarCronometro() {
    let minutos = Math.floor(tiempoRestante / 60);
    let segundos = tiempoRestante % 60;

    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = segundos < 10 ? "0" + segundos : segundos;

    document.getElementById("cronometro").innerText = minutos + ":" + segundos;

    if (tiempoRestante <= 0) {
        document.getElementById("mensaje").innerText = "¡Se acabó el tiempo! La palabra era " + palabraSeleccionada + ".";
        finalizarJuego();
    } else {
        tiempoRestante--;
    }
}

// FINALIZAR JUEGO (llamada al ganar, perder o por tiempo)
function finalizarJuego() {
    enJuego = false;
    clearInterval(cronometroIntervalo);
    // Deshabilitar todos los botones del teclado
    Array.from(document.getElementById("teclado").children).forEach(button => {
        button.disabled = true;
    });
}

// REINICIAR
function reiniciarJuego() {
    clearInterval(cronometroIntervalo);
    iniciarJuego();
}

// PAUSAR JUEGO
function pausarJuego() {
    if (enJuego) {
        enJuego = false;
        clearInterval(cronometroIntervalo);
        document.getElementById("mensaje").innerText = "Juego en pausa";
    } else {
        enJuego = true;
        document.getElementById("mensaje").innerText = "¡Adivina la palabra!";
        cronometroIntervalo = setInterval(actualizarCronometro, 1000);
    }
}

// SALIR DEL JUEGO
function salirJuego() {
    enJuego = false;
    clearInterval(cronometroIntervalo);
    palabraSeleccionada = "";
    document.getElementById("palabra").innerText = "";
    document.getElementById("pista1").innerText = "";
    document.getElementById("pista2").innerText = "";
    document.getElementById("pista3").innerText = "";
    document.getElementById("imagenAhorcado").src = "img/1.jpg";
    document.getElementById("teclado").innerHTML = "";
    document.getElementById("mensaje").innerText = "Juego cerrado";
    document.getElementById("cronometro").innerText = "10:00"; 
}
