
var palabras = [
    { palabra: "computadora", pistas: ["Probablemente lo mas importante durante decadas", "Procesa toda informacion aunque carece de conciencia", "¿1 y 0?"] },
    { palabra: "matematica", pistas: ["Lenguaje sin utilizar palabras", "Logica y Razon", "¿Y esto para qué me va a servir en la vida real?"] },
    { palabra: "hormigas", pistas: ["Seres muy inteligentes", "Trabajan para una reina que probablemente jamas han conocido", "En su contexto, son mas fuertes que el ser humano"] },
    { palabra: "volcanes", pistas: ["Gigantes", "Lava caliente", "En Guatemala, son bastante habituales"] },
    { palabra: "hormiguero", pistas: ["Es el reino de una sola reina", "Reino Diminuto", "Siempre marchan en fila"] }
];

var palabraSeleccionada = "";
var guiones = [];
var intentos = 0;
var maxIntentos = 7; 
var enJuego = false;


//TECLADO

function Teclado() {
    let teclado = document.getElementById("teclado");
    teclado.innerHTML = "";

    let letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

    letras.forEach(l => {
        let btn = document.createElement("button");
        btn.innerText = l;
        btn.onclick = () => adivinarLetra(l, btn);
        teclado.appendChild(btn);
    });
}

// Iniciar
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
    document.getElementById("mensaje").innerText = "¡Adivina la palabra!";

    Teclado();
}








