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
    // Ocultar botón de INICIO
    document.getElementById("btnInicio").style.display = "none";

    // Mostrar los otros botones
    const botones = document.querySelectorAll(".controles-card button");
    botones.forEach((btn, index) => {
        if (index !== 0) { // excepto INICIO
            btn.style.display = "inline-block";
        }
    });

    let aleatoria = Math.floor(Math.random() * palabras.length);
    let obj = palabras[aleatoria];

    palabraSeleccionada = obj.palabra.toUpperCase();
    guiones = Array(palabraSeleccionada.length).fill("_");
    intentos = 0;
    enJuego = true;

    // Inicializar el contador de intentos restantes
    document.getElementById("intentos").innerText = maxIntentos - intentos;

    document.getElementById("palabra").innerText = guiones.join(" ");
    document.getElementById("imagenAhorcado").src = "img/1.jpg";
    document.getElementById("pista1").innerText = obj.pistas[0];
    document.getElementById("pista2").innerText = obj.pistas[1];
    document.getElementById("pista3").innerText = obj.pistas[2];
    document.getElementById("mensaje").innerText = "Adivina la Palabra";

    const divFinal = document.getElementById("imagenPalabraFinal");
    const imgFinal = divFinal.querySelector("img");
    imgFinal.src = "";
    divFinal.style.display = "none";

    Teclado();

    tiempoRestante = 90;
    actualizarCronometro();
    clearInterval(cronometroIntervalo);
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
        // Actualizar el contador de intentos restantes al fallar
        document.getElementById("intentos").innerText = maxIntentos - intentos;
    }

    document.getElementById("palabra").innerText = guiones.join(" ");

    if (!guiones.includes("_")) {
        const imagenFinal = imagenesPalabras[palabraSeleccionada] || imagenPorDefecto;
        const divFinal = document.getElementById("imagenPalabraFinal");
        const imgFinal = divFinal.querySelector("img");
        imgFinal.src = imagenFinal;
        divFinal.style.display = "block";

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
        document.getElementById("mensaje").innerText = "Se Acabo el tiempo, la palabra era " + palabraSeleccionada + ".";
        finalizarJuego();
    } else {
        tiempoRestante--;
    }
}

// FINALIZAR JUEGO
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
    const btnPausa = document.querySelector(".controles-card button:nth-child(3)"); // el botón PAUSA

    if (enJuego) {
        enJuego = false;
        clearInterval(cronometroIntervalo);
        document.getElementById("mensaje").innerText = "Juego en pausa";
        btnPausa.innerText = "REANUDAR"; // cambiar texto
    } else {
        enJuego = true;
        document.getElementById("mensaje").innerText = "Adivina la Palabra";
        cronometroIntervalo = setInterval(actualizarCronometro, 1000);
        btnPausa.innerText = "PAUSA"; // volver a PAUSA
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
    document.getElementById("intentos").innerText = maxIntentos; // Restablecer el contador al valor inicial

    // Mostrar solo el botón INICIO
    const botones = document.querySelectorAll(".controles-card button");
    botones.forEach((btn, index) => {
        if (index === 0) { // INICIO
            btn.style.display = "inline-block";
        } else { // los demás
            btn.style.display = "none";
        }
    });
}

// Imagen del Juego
const imagenesPalabras = {
    "COMPUTADORA": "img/computadora.png",
    "MATEMATICA": "img/matematica.png",
    "HORMIGAS": "img/hormigas.png",
    "VOLCANES": "img/volcanes.png",
    "HORMIGUERO": "img/hormiguero.png"
};

const imagenPorDefecto = "img/default.png";

// Teclas Físicas
document.addEventListener("keydown", (event) => {
    if (!enJuego)
        return;

    event.preventDefault();

    let tecla = event.key.toUpperCase();

    const letrasValidas = "ABCDEFGHIJKLMN\u00D1OPQRSTUVWXYZ";
    if (!letrasValidas.includes(tecla))
        return;

    // Busca el botón correspondiente en el teclado en pantalla
    const botones = Array.from(document.getElementById("teclado").children);
    const botonCorrespondiente = botones.find(btn => btn.innerText === tecla);

    // Si el botón existe y no está deshabilitado, llama a la función
    if (botonCorrespondiente && !botonCorrespondiente.disabled) {
        adivinarLetra(tecla, botonCorrespondiente);
    }
});

// Al cargar la página, solo mostrar INICIO
window.addEventListener("DOMContentLoaded", () => {
    const botones = document.querySelectorAll(".controles-card button");
    botones.forEach((btn, index) => {
        if (index === 0) { // INICIO
            btn.style.display = "inline-block";
        } else { // los demás
            btn.style.display = "none";
        }
    });
});