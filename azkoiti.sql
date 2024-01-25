-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS azkoiti;

-- Selección de la base de datos
USE azkoiti;

-- Creación de la tabla Usuario
CREATE TABLE usuario (
    id INT PRIMARY KEY,
    is_admin BIT DEFAULT 0,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    correo VARCHAR(255),
    contraseña VARCHAR(255)
);

-- Creación de la tabla Préstamo
CREATE TABLE prestamo (
    id INT PRIMARY KEY,
    id_usuario INT,
    cantidad FLOAT,
    fh_inicio DATETIME,
    fh_final DATETIME,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id)
);