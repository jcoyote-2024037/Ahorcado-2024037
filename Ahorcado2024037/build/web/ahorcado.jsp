<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Ahorcado</title>
        <link rel="stylesheet" href="css/style.css">
        <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

    </head>
    <body>
        <div class="stars"></div>
        <div class="shooting-star"></div>
        <div class="shooting-star"></div>
        <div class="shooting-star"></div>
        <div class="shooting-star"></div>
        <div class="shooting-star"></div>

<div class="card">
    <h1>Juego del Ahorcado</h1>

    <div class="main-area">
        <div id="escenario">
            <img id="imagenAhorcado" src="img/1.jpg" alt="Ahorcado">
        </div>

        <div class="info-area">
            <div id="cronometro">10:00</div>

            <div id="pistas">
                <p><strong>Pista 1:</strong> <span id="pista1"></span></p>
                <p><strong>Pista 2:</strong> <span id="pista2"></span></p>
                <p><strong>Pista 3:</strong> <span id="pista3"></span></p>
            </div>
        </div>
        </div>

    <div id="palabra"></div>

    <div id="teclado"></div>

    <div id="controles">
        <button onclick="iniciarJuego()">INICIO</button>
        <button onclick="reiniciarJuego()">REINICIAR</button>
        <button onclick="pausarJuego()">PAUSA</button>
        <button onclick="salirJuego()">SALIR</button>
    </div>

    <p id="mensaje"></p>
</div>

        <script>
            var palabras = [];
            <c:forEach var="p" items="${palabras}">
            palabras.push({
                palabra: "${p.nombrePalabra}",
                pistas: ["${p.pista1}", "${p.pista2}", "${p.pista3}"]
            });
            </c:forEach>
        </script>

        <script src="js/script.js"></script>


    </body>
</html>
