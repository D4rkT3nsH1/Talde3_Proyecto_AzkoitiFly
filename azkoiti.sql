-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS azkoiti;

-- Selección de la base de datos
USE azkoiti;

-- Creación de la tabla Usuario
CREATE TABLE Usuario (
    id INT PRIMARY KEY,
    tipo VARCHAR(255),
    nombre VARCHAR(255),
    apellido VARCHAR(255)
);

-- Creación de la tabla Préstamo
CREATE TABLE Prestamo (
    id INT PRIMARY KEY,
    id_usuario INT,
    cantidad INT,
    fh_inicio DATETIME,
    fh_final DATETIME,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id)
);
