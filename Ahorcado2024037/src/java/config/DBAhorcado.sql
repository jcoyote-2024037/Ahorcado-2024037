-- drop database if exists DBAhorcado;
create database DBAhorcado;
use DBAhorcado;

CREATE TABLE Palabras (
    codigoPalabra INT AUTO_INCREMENT,
    nombrePalabra VARCHAR(50) NOT NULL,
    pista1 VARCHAR(255) NOT NULL,
    pista2 VARCHAR(255) NOT NULL,
    pista3 VARCHAR(255) NOT NULL,
    PRIMARY KEY PK_codigoPalabra (codigoPalabra)
);

-- AGREGAR PALABRA
DELIMITER $$
CREATE PROCEDURE sp_AgregarPalabra (
    IN nombrePal VARCHAR(50),
    IN pistaUno VARCHAR(255),
    IN pistaDos VARCHAR(255),
    IN pistaTres VARCHAR(255)
)
BEGIN
    INSERT INTO Palabras (nombrePalabra, pista1, pista2, pista3)
    VALUES (nombrePal, pistaUno, pistaDos, pistaTres);
END$$
DELIMITER ;

-- Ejemplos de inserciones
call sp_AgregarPalabra('computadora', 'Probablemente lo más importante durante décadas', 'Procesa toda información aunque carece de conciencia', '¿1 y 0?');
call sp_AgregarPalabra('matematica', 'Lenguaje sin utilizar palabras', 'Lógica y Razón', '¿Y esto para qué me va a servir en la vida real?');
call sp_AgregarPalabra('hormigas', 'Seres muy inteligentes', 'Trabajan para una reina que probablemente jamás han conocido', 'En su contexto, son más fuertes que el ser humano');
call sp_AgregarPalabra('volcanes', 'Gigantes', 'Lava caliente', 'En Guatemala, son bastante habituales');
call sp_AgregarPalabra('hormiguero', 'Es el reino de una sola reina', 'Reino diminuto', 'Siempre marchan en fila');


-- LISTAR PALABRAS
DELIMITER $$
CREATE PROCEDURE sp_ListarPalabras ()
BEGIN
    SELECT * FROM Palabras;
END$$
DELIMITER ;

call sp_ListarPalabras();


-- ELIMINAR PALABRA
DELIMITER $$
CREATE PROCEDURE sp_EliminarPalabra (
    IN codPalabra INT
)
BEGIN
    DELETE FROM Palabras WHERE codigoPalabra = codPalabra;
END$$
DELIMITER ;


-- BUSCAR PALABRA
DELIMITER $$
CREATE PROCEDURE sp_BuscarPalabra (
    IN codPalabra INT
)
BEGIN
    SELECT * FROM Palabras WHERE codigoPalabra = codPalabra;
END$$
DELIMITER ;

call sp_BuscarPalabra(1);


-- EDITAR PALABRA
DELIMITER $$
CREATE PROCEDURE sp_EditarPalabra (
    IN codPalabra INT,
    IN nombrePal VARCHAR(50),
    IN pistaUno VARCHAR(255),
    IN pistaDos VARCHAR(255),
    IN pistaTres VARCHAR(255)
)
BEGIN
    UPDATE Palabras 
    SET nombrePalabra = nombrePal,
        pista1 = pistaUno,
        pista2 = pistaDos,
        pista3 = pistaTres
    WHERE codigoPalabra = codPalabra;
END$$
DELIMITER ;
