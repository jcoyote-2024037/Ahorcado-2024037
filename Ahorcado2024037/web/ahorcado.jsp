<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Ahorcado</title>
        <link rel="stylesheet" href="css/style.css">
        <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    </head>
    <body>
        <div class="page-wrapper">
            <header class="header-card">
                <h1>Juego del Ahorcado</h1>
                <p class="subtitle">Adivina la palabra antes de que se acabe el tiempo</p>
            </header>

            <main class="game-container">
                <section class="top-section">
                    <div class="card escenario-card">
                        <h1>Ahorcado</h1>
                        <img id="imagenAhorcado" src="img/1.jpg" alt="Ahorcado">
                    </div>

                    <div class="card info-card">
                        <div id="cronometro" class="cronometro">1:30</div>
                        <div class="intentos-restantes">Intentos restantes: <span id="intentos">7</span></div>
                        <div class="pistas">
                            <p><strong>Pista 1:</strong> <span id="pista1"></span></p>
                            <p><strong>Pista 2:</strong> <span id="pista2"></span></p>
                            <p><strong>Pista 3:</strong> <span id="pista3"></span></p>
                        </div>
                    </div>

                    <div id="imagenPalabraFinal" class="card imagen-final">
                        <h1>¡Felicidades!</h1>
                        <img src="" alt="Imagen de la palabra ganada">
                    </div>
                </section>

                <div class="card palabra-card">
                    <div id="palabra"></div>
                </div>

                <div class="card teclado-card">
                    <div id="teclado"></div>
                </div>

                <div class="card controles-card">
                    <button id="btnInicio" onclick="iniciarJuego()">INICIO</button>
                    <button onclick="reiniciarJuego()">CAMBIAR / REINICIAR</button>
                    <button onclick="pausarJuego()">PAUSA</button>
                    <button onclick="salirJuego()">SALIR</button>
                </div>


                <p id="mensaje"></p>
            </main>
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
